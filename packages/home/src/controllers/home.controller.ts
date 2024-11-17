import fs from 'node:fs'
import path from 'node:path'
import { RpcController } from '@nailyjs/rpc'
import { PackageJson } from 'type-fest'
import { HomeController, SearchValue } from '../common/home.protocol'
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
}
