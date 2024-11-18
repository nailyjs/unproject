import type { Class, Container, IocPlugin } from '@nailyjs/ioc'
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

export type MenuInfo = Partial<MenuMixedOption> & {
  children?: MenuInfo[]
  labelType?: 'component'
  extraType?: 'component'
  iconType?: 'component'
  key: Key
}

export type RpcController = Class

export interface IBeforeStartContext {
  addVitePlugin(plugin: PluginOption | Plugin): this
  addRoute(route: RouteInfo): this
  addLayoutRoute(route: RouteInfo): this
  addMenu(menu: MenuInfo): this
  addRpcRoute(route: RpcController): this
  updateUnoCSSConfig(config: VitePluginConfig): this
  getUnoCSSConfig(): VitePluginConfig
  updateVueConfig(config: VueOptions): this
  getVueConfig(): VueOptions
  updateVueJsxConfig(config: VueJsxOptions): this
  getVueJsxConfig(): VueJsxOptions
  addUnoCSSSafeList(safeList: string[]): this
  getUnoCSSSafeList(): string[]
  getGlobalContainer(): Container
}

export interface UnProjectPlugin extends IocPlugin {
  beforeStartServer?(context: IBeforeStartContext): Promise<void>
}

export namespace Configuration {
  export interface Plugin {
    specifier: string
    options?: any
  }
  export interface Vite {
    inspect?: boolean
  }
  export interface Config {
    plugins: Plugin[]
    vite: Vite
  }
}
