import type { Plugin, PluginOption } from 'vite'
import type { MenuInfo, RpcController, UnProjectBootstrap } from '../index'
import { ClassWrapper, Injectable } from '@nailyjs/ioc'
import { Options as VueOptions } from '@vitejs/plugin-vue'
import { Options as VueJsxOptions } from '@vitejs/plugin-vue-jsx'
import { presetAttributify, presetIcons, presetTypography, presetUno } from 'unocss'
import { VitePluginConfig } from 'unocss/vite'
import { IBeforeStartContext, RouteInfo } from '../types'

@Injectable()
export class BeforeStartContext implements IBeforeStartContext {
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

  static getInstance(container: UnProjectBootstrap): BeforeStartContext {
    const map = container.getContainer()
    if (map.has(BeforeStartContext) && map.get(BeforeStartContext).wrapperType === 'class')
      return (map.get(BeforeStartContext) as ClassWrapper<BeforeStartContext>).getClassFactory().getOrCreateInstance()
    return container.createClassWrapper(BeforeStartContext).getClassFactory().getOrCreateInstance()
  }
}
