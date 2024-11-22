import path from 'node:path'
import { IBeforeStartContext, UnProjectPlugin } from '@unproject/core'
import { HomeControllerImpl } from './controllers/home.controller'

class HomePluginImpl implements UnProjectPlugin {
  name: string = 'unproject:home'
  private dirname: string = globalThis.__dirname || new URL('.', import.meta.url).pathname

  async beforeStartServer(context: IBeforeStartContext): Promise<void> {
    context
      .addRpcRoute(HomeControllerImpl)
      .registerHljsLanguage('json')
      .mergeI18nMessage('zh-CN', {
        'unproject:home': {
          title: '首页',
        },
      })
      .addRoute({
        path: '/dashboard',
        name: 'unproject:home',
        component: path.join(this.dirname, '../src/pages/Home.vue'),
      })
      .addRoute({
        path: '/dashboard/market',
        name: 'unproject:home/market',
        component: path.join(this.dirname, '../src/pages/Market.vue'),
      })
      .addRoute({
        path: '/dashboard/typescript',
        name: 'unproject:home/typescript',
        component: path.join(this.dirname, '../src/pages/Typescript.vue'),
      })
      .addUnoCSSSafeList([
        'i-vscode-icons-folder-type-frontcommerce-opened',
        'i-vscode-icons-folder-type-plugin-opened',
        'i-vscode-icons-folder-type-light-node-opened',
      ])
      .addMenu({
        labelType: 'component',
        label: path.join(this.dirname, '../src/components/HomeLabel.vue'),
        iconType: 'component',
        icon: path.join(this.dirname, '../src/components/HomeIcon.vue'),
        key: 'unproject:home',
        children: [
          {
            labelType: 'component',
            label: path.join(this.dirname, '../src/components/DashboardLabel.vue'),
            key: 'unproject:home/dashboard',
            iconType: 'component',
            icon: path.join(this.dirname, '../src/components/DashboardIcon.vue'),
          },
          {
            labelType: 'component',
            label: path.join(this.dirname, '../src/components/MarketLabel.vue'),
            key: 'unproject:home/market',
            iconType: 'component',
            icon: path.join(this.dirname, '../src/components/MarketIcon.vue'),
          },
          {
            labelType: 'component',
            label: path.join(this.dirname, '../src/components/TypescriptLabel.vue'),
            key: 'unproject:home/typescript',
            iconType: 'component',
            icon: path.join(this.dirname, '../src/components/TypescriptIcon.vue'),
          },
        ],
      })
  }
}

export function HomePlugin(): UnProjectPlugin {
  return new HomePluginImpl()
}
export default HomePlugin
