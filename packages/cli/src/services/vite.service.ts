import type { InlineConfig } from 'vite'
import path from 'node:path'
import { ClassWrapper, Container, Injectable } from '@nailyjs/ioc'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import { MenuInjector } from '../plugins/menu'
import { VueRouterInjector } from '../plugins/router'
import swc, { defaultSwcOptions } from '../swc'
import { BeforeStartContext } from './before-start.context'

let __dirname = globalThis.__dirname
if (!__dirname)
  __dirname = new URL('.', import.meta.url).pathname

@Injectable()
export class ViteService {
  getBaseConfiguration(beforeStartContext: BeforeStartContext): InlineConfig {
    return {
      esbuild: false,
      root: path.join(__dirname, '../frontend'),
      plugins: [
        swc.vite(defaultSwcOptions),
        Vue(beforeStartContext.getVueConfig()),
        VueJsx(beforeStartContext.getVueJsxConfig()),
        UnoCSS(beforeStartContext.getUnoCSSConfig()),
        VueRouterInjector(beforeStartContext),
        MenuInjector(beforeStartContext),
        ...beforeStartContext.vitePlugins,
      ],
      configFile: false,
      server: {
        host: '0.0.0.0',
      },
      optimizeDeps: {
        include: ['date-fns', 'naive-ui'],
      },
    }
  }

  static getInstance(container: Container): ViteService {
    const viteService = container.getContainer().get(ViteService) as ClassWrapper<ViteService>
    if (viteService && viteService.wrapperType === 'class')
      return viteService.getClassFactory().getOrCreateInstance()
    return container.createClassWrapper(ViteService).getClassFactory().getOrCreateInstance()
  }
}
