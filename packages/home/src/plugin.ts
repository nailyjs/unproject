import path from 'node:path'
import { IBeforeStartContext, UnProjectPlugin } from '@unproject/core'
import { HomeControllerImpl } from './controllers/home.controller'

class HomePluginImpl implements UnProjectPlugin {
  name: string = 'unproject:home'
  private dirname: string = globalThis.__dirname || new URL('.', import.meta.url).pathname

  async beforeStartServer(context: IBeforeStartContext): Promise<void> {
    context
      .addRoute({
        path: '/dashboard',
        name: 'unproject:home',
        component: path.join(this.dirname, '../src/pages/Home.vue'),
      })
      .addMenu({
        labelType: 'component',
        label: path.join(this.dirname, '../src/components/HomeLabel.vue'),
        iconType: 'component',
        icon: path.join(this.dirname, '../src/components/HomeIcon.vue'),
        key: 'unproject:home',
      })
      .addRpcRoute(HomeControllerImpl)
  }
}

export function HomePlugin(): UnProjectPlugin {
  return new HomePluginImpl()
}
export default HomePlugin
