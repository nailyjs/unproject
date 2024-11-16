import fs from 'node:fs'
import path from 'node:path'
import { RpcController } from '@nailyjs/rpc'
import { PackageJson } from 'type-fest'
import { HomeController } from '../common/home.protocol'

@RpcController(HomeController)
export class HomeControllerImpl implements HomeController {
  getPackageJson(): PackageJson {
    const packageJson = fs.readFileSync(path.resolve('package.json'), 'utf-8')
    return JSON.parse(packageJson)
  }
}
