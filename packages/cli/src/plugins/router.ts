import { Plugin } from 'vite'
import { BeforeStartContext } from '../services/before-start.context'

function customRouterStringify<Obj>(obj: Obj): string {
  if (Array.isArray(obj)) {
    return `[${obj.map(customRouterStringify).join(', ')}]`
  }
  else if (typeof obj === 'object' && obj !== null) {
    const props = []
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        if (key === 'component' && typeof obj[key] === 'string') {
          props.push(`"${key}": () => import('${obj[key]}')`)
        }
        else {
          props.push(`"${key}": ${customRouterStringify(obj[key])}`)
        }
      }
    }
    return `{${props.join(', ')}}`
  }
  else if (typeof obj === 'string') {
    return `"${obj}"`
  }
  else {
    return String(obj)
  }
}

export function VueRouterInjector(context: BeforeStartContext): Plugin {
  const virtualModuleId = 'virtual:uncli:vue-router'
  const resolvedVirtualModuleId = `\0${virtualModuleId}`

  return {
    name: 'uncli:vue-router-injector',
    enforce: 'pre',
    apply: 'serve',

    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },

    load(id) {
      if (id === resolvedVirtualModuleId) return `export const routes = ${customRouterStringify(context.routes)};\nexport const layoutRoutes = ${customRouterStringify(context.layoutRoutes)};\n`
    },
  }
}
