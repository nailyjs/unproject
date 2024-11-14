import { ClassWrapper, Container, Injectable } from '@nailyjs/ioc'
import { importx } from 'importx'
import k from 'kleur'
import { UnCliPlugin } from '../types'
import { UncliConfigService } from './config.service'

let __filename = globalThis.__filename
if (!__filename) __filename = import.meta.url

export type FailReason = `import-not-found:${string}` | 'no-default' | 'no-function' | 'return-no-object'

@Injectable()
export class PluginDiscoveryService {
  constructor(private readonly uncliConfigService: UncliConfigService) {}

  failLoadSpecifiers = new Map<string, FailReason>()
  successLoadSpecifiers = new Set<string>()

  private async loadPlugin(specifier: string): Promise<(options: any) => (UnCliPlugin | Promise<UnCliPlugin>) | undefined> {
    try {
      const plugin = await importx(specifier, {
        loader: 'auto',
        parentURL: __filename,
      })
      if (!plugin.default) {
        this.failLoadSpecifiers.set(specifier, 'no-default')
        return undefined
      }
      else if (typeof plugin.default !== 'function') {
        this.failLoadSpecifiers.set(specifier, 'no-function')
        return undefined
      }
      else {
        return plugin.default
      }
    }
    catch (error) {
      this.failLoadSpecifiers.set(specifier, `import-not-found: ${error.message || 'unknown error'}`)
      return undefined
    }
  }

  async loadPlugins(cache: boolean = true): Promise<UnCliPlugin[]> {
    const plugins: UnCliPlugin[] = []
    const configuration = this.uncliConfigService.getPlugins(cache)

    this.failLoadSpecifiers.clear()
    this.successLoadSpecifiers.clear()
    for (const item of configuration) {
      const pluginFactory = await this.loadPlugin(item.specifier)
      if (!pluginFactory) continue

      const result = await pluginFactory(item.options)
      if (result && typeof result === 'object') {
        plugins.push(result)
        this.successLoadSpecifiers.add(item.specifier)
      }
      else {
        this.failLoadSpecifiers.set(item.specifier, 'return-no-object')
      }
    }

    return plugins
  }

  printPlugins(): void {
    for (const item of this.successLoadSpecifiers) {
      console.log(`  ${k.green('➜')}  ${k.bold('Plugin:')}  ${k.cyan(item)} ${k.dim('Loaded')}`)
    }
    for (const [specifier, reason] of this.failLoadSpecifiers) {
      console.log(`  ${k.red('➜')}  ${k.bold('Plugin:')}  ${k.red(specifier)} ${k.dim('Fail to load')} reason:${reason}`)
    }

    if (this.failLoadSpecifiers.size === 0 && this.successLoadSpecifiers.size === 0)
      console.log(`  ${k.yellow('➜')}  ${k.dim('No plugins loaded')}`)
  }

  static getInstance(container: Container): PluginDiscoveryService {
    const map = container.getContainer()
    if (map.has(PluginDiscoveryService) && map.get(PluginDiscoveryService).wrapperType === 'class')
      return (map.get(PluginDiscoveryService) as ClassWrapper<PluginDiscoveryService>).getClassFactory().getOrCreateInstance()
    return container.createClassWrapper(PluginDiscoveryService).getClassFactory().getOrCreateInstance()
  }
}
