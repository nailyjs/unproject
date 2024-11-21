import type { Configuration } from '../types'
import fs from 'node:fs'
import path from 'node:path'
import { Injectable } from '@nailyjs/ioc'
import { load } from 'js-yaml'

@Injectable()
export class ConfigService {
  private _config: Configuration.Config | null = null
  loadConfig(cache: boolean = true): Configuration.Config {
    if (this._config && cache) return this._config
    if (!fs.existsSync(path.resolve('uncli.yml'))) return {} as Configuration.Config
    const currentRead = fs.readFileSync(path.resolve('uncli.yml'), 'utf-8')
    this._config = load(currentRead || '{}') as Configuration.Config
    return this._config
  }

  getPlugins(cache: boolean = true): Configuration.Plugin[] {
    const configuration: Configuration.Config = (this.loadConfig(cache) || {}) as Configuration.Config
    return configuration.plugins || []
  }
}
