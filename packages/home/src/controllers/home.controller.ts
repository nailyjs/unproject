import fs from 'node:fs'
import path from 'node:path'
import { RpcController } from '@nailyjs/rpc'
import glob from 'fast-glob'
import { PackageJson } from 'type-fest'
import { DeepPartial, HomeController, SearchValue, TypeScriptConfiguration } from '../common/home.protocol'
import { SearchService } from '../services/search.service'

@RpcController(HomeController)
export class HomeControllerImpl implements HomeController {
  constructor(private readonly searchService: SearchService) {}

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
}
