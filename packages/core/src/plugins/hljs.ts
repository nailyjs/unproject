import { Plugin } from 'vite'
import { BeforeStartContext } from '../services'

export function HljsInjector(context: BeforeStartContext): Plugin {
  const virtualModuleId = 'virtual:uncli:hljs'
  const resolvedVirtualModuleId = `\0${virtualModuleId}`

  return {
    name: 'unproject:hljs-injector',
    enforce: 'pre',
    apply: 'serve',

    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },

    load(id) {
      if (id === resolvedVirtualModuleId) {
        return `export const register = async (hljs) => {
  ${context.hljsLanguages.map(lang => `hljs.registerLanguage('${lang.name}', await import('${lang.importSpecifier ? lang.importSpecifier : `highlight.js/lib/languages/${lang.name}`}').then(x => x.default));`).join('\n')}
}\n`
      }
    },
  }
}
