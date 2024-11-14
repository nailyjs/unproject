import { Plugin } from 'vite'
import { BeforeStartContext } from '../services/before-start.context'

function customMenuStringify<T>(obj: T): string
function customMenuStringify(obj: any): string {
  if (Array.isArray(obj)) {
    return `[${obj.map(customMenuStringify).join(', ')}]`
  }
  else if (typeof obj === 'object' && obj !== null) {
    const props = []
    let labelModified = false
    let extraModified = false
    let iconModified = false

    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        // Check and modify label
        if (key === 'labelType' && obj[key] === 'component') {
          if (typeof obj.label === 'string') {
            props.push(`"label": await import('${obj.label}')`)
            labelModified = true
          }
        }
        // Check and modify extra
        else if (key === 'extraType' && obj[key] === 'component') {
          if (typeof obj.extra === 'string') {
            props.push(`"extra": await import('${obj.extra}')`)
            extraModified = true
          }
        }
        // Check and modify icon
        else if (key === 'iconType' && obj[key] === 'component') {
          if (typeof obj.icon === 'string') {
            props.push(`"icon": await import('${obj.icon}')`)
            iconModified = true
          }
        }
        // Add other properties
        else if ((key !== 'label' || !labelModified)
          && (key !== 'extra' || !extraModified)
          && (key !== 'icon' || !iconModified)) {
          props.push(`"${key}": ${customMenuStringify(obj[key])}`)
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

export function MenuInjector(context: BeforeStartContext): Plugin {
  const virtualModuleId = 'virtual:uncli:menu'
  const resolvedVirtualModuleId = `\0${virtualModuleId}`

  return {
    name: 'uncli:menu-injector',
    enforce: 'pre',
    apply: 'serve',

    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },

    load(id) {
      if (id === resolvedVirtualModuleId) return `export const menu = async () => { return ${customMenuStringify(context.menus)} };\n`
    },
  }
}
