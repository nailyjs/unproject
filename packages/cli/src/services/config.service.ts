import fs from 'node:fs'
import path from 'node:path'
import { Injectable } from '@nailyjs/ioc'
import { load } from 'js-yaml'
import { UnCliConfiguration } from '../types'

@Injectable()
export class UncliConfigService {
  private _config: UnCliConfiguration.Config | null = null
  loadConfig(cache: boolean = true): UnCliConfiguration.Config {
    if (this._config && cache) return this._config
    if (!fs.existsSync(path.resolve('uncli.yml'))) return {} as UnCliConfiguration.Config
    const currentRead = fs.readFileSync(path.resolve('uncli.yml'), 'utf-8')
    this._config = load(currentRead || '{}') as UnCliConfiguration.Config
    return this._config
  }

  getPlugins(cache: boolean = true): UnCliConfiguration.Plugin[] {
    const configuration: UnCliConfiguration.Config = (this.loadConfig(cache) || {}) as UnCliConfiguration.Config
    return configuration.plugins || []
  }
}
