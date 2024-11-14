import type { MenuInfo, UncliBootstrap } from '../index'
import { Class, ClassWrapper, Injectable } from '@nailyjs/ioc'
import { Options as VueOptions } from '@vitejs/plugin-vue'
import { Options as VueJsxOptions } from '@vitejs/plugin-vue-jsx'
import { presetAttributify, presetIcons, presetTypography, presetUno } from 'unocss'
import { VitePluginConfig } from 'unocss/vite'
import { Plugin, PluginOption } from 'vite'
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

  rpcRoutes: Class[] = []
  addRpcRoute(controller: Class): this {
    this.rpcRoutes.push(controller)
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
      presetIcons(),
      presetTypography(),
    ],
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

  static getInstance(container: UncliBootstrap): BeforeStartContext {
    const map = container.getContainer()
    if (map.has(BeforeStartContext) && map.get(BeforeStartContext).wrapperType === 'class')
      return (map.get(BeforeStartContext) as ClassWrapper<BeforeStartContext>).getClassFactory().getOrCreateInstance()
    return container.createClassWrapper(BeforeStartContext).getClassFactory().getOrCreateInstance()
  }
}
