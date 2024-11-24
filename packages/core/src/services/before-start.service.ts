import type { Plugin, PluginOption } from 'vite'
import type { Configuration, DeepPartial, HljsLanguages, I18nLanguage, MenuInfo, RpcController, UnProjectBootstrap } from '../index'
import { ClassWrapper, Container, Injectable } from '@nailyjs/ioc'
import { Options as VueOptions } from '@vitejs/plugin-vue'
import { Options as VueJsxOptions } from '@vitejs/plugin-vue-jsx'
import defu from 'defu'
import { get, set } from 'lodash-es'
import { Key } from 'naive-ui/es/menu/src/interface'
import { presetAttributify, presetIcons, presetTypography, presetUno } from 'unocss'
import { VitePluginConfig } from 'unocss/vite'
import winston from 'winston'
import { ConfigService } from '../services/config.service'
import { IBeforeStartContext, RouteInfo } from '../types'

export interface HljsLanguage {
  name: HljsLanguages | (string & {})
  importSpecifier?: string
}

@Injectable()
export class BeforeStartContext implements IBeforeStartContext {
  constructor(
    private readonly _container: Container,
    private readonly configService: ConfigService,
    public readonly logger: winston.Logger,
  ) {}

  getConfiguration(cache: boolean = true): DeepPartial<Configuration.Config> {
    return this.configService.loadConfig(cache)
  }

  getGlobalContainer(): Container {
    return this._container
  }

  vitePlugins: (PluginOption | Plugin)[] = []
  addVitePlugin(plugin: PluginOption | Plugin): this {
    this.vitePlugins.push(plugin)
    return this
  }

  routes: RouteInfo[] = []
  addRoute(route: RouteInfo): this {
    this.routes.push(route)
    return this
  }

  layoutRoutes: RouteInfo[] = []
  addLayoutRoute(route: RouteInfo): this {
    this.layoutRoutes.push(route)
    return this
  }

  unoCSSConfig: VitePluginConfig = {
    presets: [
      presetUno(),
      presetAttributify(),
      presetIcons({
        cdn: 'https://esm.sh/',
      }),
      presetTypography(),
    ],
    configFile: false,
  }

  updateUnoCSSConfig(config: VitePluginConfig): this {
    this.unoCSSConfig = config
    return this
  }

  getUnoCSSConfig(): VitePluginConfig {
    return this.unoCSSConfig
  }

  vueConfig: VueOptions = {}
  updateVueConfig(config: VueOptions): this {
    this.vueConfig = config
    return this
  }

  getVueConfig(): VueOptions {
    return this.vueConfig
  }

  vueJsxConfig: VueJsxOptions = {}
  updateVueJsxConfig(config: VueJsxOptions): this {
    this.vueJsxConfig = config
    return this
  }

  getVueJsxConfig(): VueJsxOptions {
    return this.vueJsxConfig
  }

  menus: MenuInfo[] = []
  addMenu(menu: MenuInfo): this {
    this.menus.push(menu)
    return this
  }

  rpcRoutes: RpcController[] = []
  addRpcRoute(route: RpcController): this {
    this.rpcRoutes.push(route)
    return this
  }

  unoCSSSafeList: string[] = []
  addUnoCSSSafeList(safeList: string[]): this {
    this.unoCSSSafeList.push(...safeList)
    return this
  }

  getUnoCSSSafeList(): string[] {
    return this.unoCSSSafeList
  }

  hljsLanguages: HljsLanguage[] = [{ name: 'json' }]

  registerHljsLanguage(language: HljsLanguages | (string & {}), importSpecifier?: string): this {
    const registeredLang = this.hljsLanguages.find(lang => lang.name === language && lang.importSpecifier === importSpecifier)
    if (!registeredLang) {
      this.hljsLanguages.push({ name: language, importSpecifier })
      return this
    }

    registeredLang.importSpecifier = importSpecifier
    registeredLang.name = language
    this.hljsLanguages = this.hljsLanguages.filter(lang => lang.name !== language || lang.importSpecifier !== importSpecifier)
    this.hljsLanguages.push(registeredLang) // move to the end
    return this
  }

  i18nConfig: DeepPartial<Configuration.Config['i18n']> = {}

  setI18nMessage<Key extends string>(lang: I18nLanguage | (string & {}), key: Key, value: string): this {
    if (!this.i18nConfig[lang]) {
      this.i18nConfig[lang] = {}
    }
    set(this.i18nConfig[lang], key, value)
    return this
  }

  getI18nMessage<Key extends string>(lang: I18nLanguage | (string & {}), key: Key): string | undefined {
    return get(this.i18nConfig[lang], key)
  }

  mergeI18nMessage(lang: I18nLanguage | (string & {}), messages: Record<Key, string>): this {
    if (!this.i18nConfig[lang]) {
      this.i18nConfig[lang] = {}
    }
    this.i18nConfig[lang] = defu(this.i18nConfig[lang], messages)
    return this
  }

  static getInstance(container: UnProjectBootstrap): BeforeStartContext {
    const map
     = container.getContainer()
    if (map.has(BeforeStartContext) && map.get(BeforeStartContext).wrapperType === 'class')
      return (map.get(BeforeStartContext) as ClassWrapper<BeforeStartContext>).getClassFactory().getOrCreateInstance()
    return container.createClassWrapper(BeforeStartContext).getClassFactory().getOrCreateInstance()
  }
}
