import type { ViteDevServer } from 'vite'
import path from 'node:path'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { createServer } from 'vite'
import { defaultSwcOptions, swc } from './swc'

let __dirname = globalThis.__dirname
if (!__dirname)
  __dirname = new URL('.', import.meta.url).pathname

export interface UseServerReturn {
  createViteServer: () => Promise<ViteDevServer>
}

export function useServer(): UseServerReturn {
  function createViteServer(): Promise<ViteDevServer> {
    return createServer({
      esbuild: false,
      root: path.join(__dirname, '../frontend'),
      plugins: [
        swc.vite(defaultSwcOptions),

        Vue(),

        VueJsx(),
      ],

      configFile: false,

      server: {
        host: '0.0.0.0',
      },
    })
  }

  return {
    createViteServer,
  }
}
