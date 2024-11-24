import type { PackageJson } from 'type-fest'
import fs from 'node:fs'
import path from 'node:path'
import { RpcController } from '@nailyjs/rpc'
import { WebsocketServer } from '@unproject/core'
import glob from 'fast-glob'
import winston from 'winston'
import { DeepPartial, HomeController, InternalLogReturn, SearchValue, TypeScriptConfiguration } from '../common/home.protocol'
import { InstallService } from '../services/install.service'
import { SearchService } from '../services/search.service'

@RpcController(HomeController)
export class HomeControllerImpl implements HomeController {
  constructor(
    private readonly searchService: SearchService,
    private readonly installService: InstallService,
    private readonly logger: winston.Logger,
    wsServer: WebsocketServer,
  ) {
    wsServer.send('home', 'Hello from HomeControllerImpl')
  }

  getPackageJson(): PackageJson | 'not-found' {
    const packageJsonPath = path.resolve('package.json')
    if (!fs.existsSync(packageJsonPath)) return 'not-found'
    const packageJson = fs.readFileSync(packageJsonPath, 'utf-8')
    return JSON.parse(packageJson)
  }

  search(type: 'npm' | 'github' | 'taobao', keywords: string, options: Record<string, any>): Promise<SearchValue> {
    return this.searchService.search(type, keywords, options)
  }

  async getTypeScriptConfiguration(): Promise<TypeScriptConfiguration | 'not-found'> {
    const tsconfigPath = path.resolve('tsconfig.json')
    if (!fs.existsSync(tsconfigPath)) return 'not-found'
    const tsconfig = fs.readFileSync(tsconfigPath, 'utf-8')
    return JSON.parse(tsconfig)
  }

  async getTypeScriptConfigurationLayer(): Promise<Record<string, TypeScriptConfiguration>> {
    const paths = glob.globSync(['./tsconfig.*.json', './tsconfig.json'], {
      absolute: true,
      extglob: true,
    })

    const result: Record<string, TypeScriptConfiguration> = {}
    for (const tsconfigPath of paths) {
      const tsconfig = fs.readFileSync(tsconfigPath, 'utf-8') || '{}'
      result[tsconfigPath] = JSON.parse(tsconfig)
    }
    return result
  }

  async updateTypeScriptConfiguration(path: string, configuration: DeepPartial<TypeScriptConfiguration>): Promise<'not-found' | TypeScriptConfiguration> {
    const layer = await this.getTypeScriptConfigurationLayer()
    if (!layer[path]) return 'not-found'
    fs.writeFileSync(path, JSON.stringify(configuration, null, 2))
    return configuration as TypeScriptConfiguration
  }

  async installPackage(name: string): Promise<{ code: number }> {
    const [agent, args] = await this.installService.getArgentWithArgs(name)
    this.logger.log('info', `Installing package: ${name}`)
    const exec = this.installService.installPackage(agent, args, [name])
    exec.stdout?.on('data', data => this.logger.log('info', data.toString().trim()))
    exec.stderr?.on('data', data => this.logger.log('error', data.toString().trim()))
    exec.on('exit', code => this.logger.verbose(`Package ${name} installed with code ${code}`))

    return new Promise<{ code: number }>((resolve) => {
      exec.on('close', code => resolve({ code }))
    })
  }

  async getInternalLogs(): Promise<InternalLogReturn> {
    const logPath = path.resolve('.unproject/unproject.log')
    if (!fs.existsSync(logPath)) return Promise.resolve({ logs: [], raw: '', rawLines: [] })
    const logs = fs.readFileSync(logPath, 'utf-8')

    return {
      logs: logs.split('\n').map((log): (Record<string, string> | 'parse-error') => {
        try {
          return JSON.parse(log)
        }
        // eslint-disable-next-line unused-imports/no-unused-vars
        catch (e) {
          return 'parse-error'
        }
      }),
      raw: logs,
      rawLines: logs.split('\n'),
    }
  }
}
