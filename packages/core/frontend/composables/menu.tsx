/// <reference types="../shims.d.ts" />

import { menu } from 'virtual:uncli:menu'
import { h } from 'vue'

export function useMenuOptions() {
  return async function load(children?: any[]) {
    const menuOptions = children || await menu()

    for (const menuOption of menuOptions) {
      if (typeof menuOption.label === 'object') {
        const mod = menuOption.label
        menuOption.label = () => h(mod.default)
      }
      if (typeof menuOption.icon === 'object') {
        const mod = menuOption.icon
        menuOption.icon = () => h(mod.default)
      }
      if (typeof menuOption.extra === 'object') {
        const mod = menuOption.extra
        menuOption.extra = () => h(mod.default)
      }

      if (Array.isArray(menuOption.children))
        menuOption.children = await load(menuOption.children)
    }

    return menuOptions
  }
}
