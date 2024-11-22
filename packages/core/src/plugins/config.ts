import { Plugin } from 'vite'
import { BeforeStartContext } from '../services'

export function ConfigInjector(context: BeforeStartContext): Plugin {
  const virtualModuleId = 'virtual:uncli:config'
  const resolvedVirtualModuleId = `\0${virtualModuleId}`

  return {
    name: 'unproject:config-injector',
    enforce: 'pre',
    apply: 'serve',

    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },

    load(id) {
      if (id === resolvedVirtualModuleId) {
        return `export default ${JSON.stringify(context.getConfiguration())}`
      }
    },
  }
}
