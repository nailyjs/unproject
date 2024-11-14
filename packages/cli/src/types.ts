import type { Class, IocPlugin } from '@nailyjs/ioc'
import type { Key, MenuMixedOption } from 'naive-ui/es/menu/src/interface'
import type { RouteRecordRaw } from 'vue-router'
import { Options as VueOptions } from '@vitejs/plugin-vue'
import { Options as VueJsxOptions } from '@vitejs/plugin-vue-jsx'
import { VitePluginConfig } from 'unocss/vite'
import { Plugin, PluginOption } from 'vite'

type RouteInfoImpl = Omit<RouteRecordRaw, 'component'> & {
  /** The component `absolute` file path. */
  component: string
}

export type RouteInfo = Omit<RouteInfoImpl, 'children'> & {
  children?: RouteInfo[]
}

export type MenuInfo = MenuMixedOption & {
  children?: MenuInfo[]
  labelType?: 'component'
  extraType?: 'component'
  iconType?: 'component'
  key: Key
}

export interface IBeforeStartContext {
  addVitePlugin(plugin: PluginOption | Plugin): this
  addRoute(route: RouteInfo): this
  addLayoutRoute(route: RouteInfo): this
  addMenu(menu: MenuInfo): this
  addRpcRoute(controller: Class): this
  updateUnoCSSConfig(config: VitePluginConfig): this
  getUnoCSSConfig(): VitePluginConfig
  updateVueConfig(config: VueOptions): this
  getVueConfig(): VueOptions
  updateVueJsxConfig(config: VueJsxOptions): this
  getVueJsxConfig(): VueJsxOptions
}

export interface UnCliPlugin extends IocPlugin {
  beforeStartServer?(context: IBeforeStartContext): Promise<void>
}

export namespace UnCliConfiguration {
  export interface Plugin {
    specifier: string
    options?: any
  }
  export interface Config {
    plugins: Plugin[]
  }
}
