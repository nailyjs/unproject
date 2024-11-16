import type { InlineConfig } from 'vite'
import path from 'node:path'
import { ClassWrapper, Container, Injectable } from '@nailyjs/ioc'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import Inspect from 'vite-plugin-inspect'
import { MenuInjector } from '../plugins/menu'
import { VueRouterInjector } from '../plugins/router'
import { NailyRpc } from '../plugins/rpc'
import swc, { defaultSwcOptions } from '../swc'
import { BeforeStartContext } from './before-start.service'
import { ConfigService } from './config.service'

let __dirname = globalThis.__dirname
if (!__dirname)
  __dirname = new URL('.', import.meta.url).pathname

@Injectable()
export class ViteService {
  constructor(private readonly uncliConfigService: ConfigService) {}

  getBaseConfiguration(beforeStartContext: BeforeStartContext): InlineConfig {
    const config: InlineConfig = {
      esbuild: false,
      root: path.join(__dirname, '../frontend'),
      plugins: [
        swc.vite(defaultSwcOptions),
        Vue(beforeStartContext.getVueConfig()),
        VueJsx(beforeStartContext.getVueJsxConfig()),
        UnoCSS(beforeStartContext.getUnoCSSConfig()),
        VueRouterInjector(beforeStartContext),
        MenuInjector(beforeStartContext),
        NailyRpc(beforeStartContext),
        ...beforeStartContext.vitePlugins,
      ],
      configFile: false,
      server: {
        host: '0.0.0.0',
      },
      optimizeDeps: {
        include: ['date-fns', 'naive-ui', 'vue', 'vue-router', 'pinia'],
      },
    }
    if (this.uncliConfigService.isEnableInspect()) config.plugins.push(Inspect(this.uncliConfigService.getInspectOptions()))
    return config
  }

  static getInstance(container: Container): ViteService {
    const viteService = container.getContainer().get(ViteService) as ClassWrapper<ViteService>
    if (viteService && viteService.wrapperType === 'class')
      return viteService.getClassFactory().getOrCreateInstance()
    return container.createClassWrapper(ViteService).getClassFactory().getOrCreateInstance()
  }
}