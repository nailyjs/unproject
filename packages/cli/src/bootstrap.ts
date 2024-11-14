import type { UnCliPlugin } from './types'
import path from 'node:path'
import { argv } from 'node:process'
import { AbstractBootstrap } from '@nailyjs/ioc'
import { Command } from 'commander'
import k from 'kleur'
import { createServer } from 'vite'
import { description, version } from '../package.json'
import { BeforeStartContext } from './services/before-start.context'
import { PluginDiscoveryService } from './services/plugin-discovery.service'
import { ViteService } from './services/vite.service'

export class UncliBootstrap extends AbstractBootstrap {
  private setupCommands(beforeStartContext: BeforeStartContext, restart: boolean): Command {
    return new Command()
      .name('uncli')
      .version(version, '-v, --version')
      .description(description)
      .action(async () => {
        const configuration = ViteService.getInstance(this).getBaseConfiguration(beforeStartContext)
        const viteServer = await createServer(configuration)
        await viteServer.listen()
        if (!restart) console.clear()
        console.log()
        console.log(`   ${k.bold('⚙️ uncli')} ${k.dim(`v${version}`)}`)
        console.log()
        viteServer.printUrls()
        PluginDiscoveryService.getInstance(this).printPlugins()
        viteServer.bindCLIShortcuts({ print: true })
        viteServer.watcher.add(path.resolve('uncli.yml')).on('all', async (ev, filePath) => {
          if (filePath === path.resolve('uncli.yml')) {
            console.clear()
            console.log(k.yellow('uncli.yml has changed, reloading plugins...'))
            await viteServer.close()
            await this.run(true)
          }
        })
      })
  }

  public override use(plugin: UnCliPlugin | UnCliPlugin[]): this {
    return super.use(plugin)
  }

  private async runPluginHooks(): Promise<BeforeStartContext> {
    const pluginRunner = this.getPluginRunner()
    await pluginRunner.runBeforeRun()
    const pluginsContainer = pluginRunner.getPluginContainer() as readonly UnCliPlugin[]
    const beforeStartContext = BeforeStartContext.getInstance(this)
    for (const plugin of pluginsContainer) {
      if (plugin.beforeStartServer) await plugin.beforeStartServer(beforeStartContext)
    }
    return beforeStartContext
  }

  private async loadPlugins(restart: boolean = false): Promise<UnCliPlugin[]> {
    const discovery = PluginDiscoveryService.getInstance(this)
    return await discovery.loadPlugins(!restart)
  }

  public override async run(restart: boolean = false): Promise<any> {
    const plugins = await this.loadPlugins(restart)
    for (const plugin of plugins) this.use(plugin)
    this.setupCommands(await this.runPluginHooks(), restart)
      .parse(argv)
  }
}
