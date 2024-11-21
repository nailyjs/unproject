import path from 'node:path'
import { IBeforeStartContext, UnProjectPlugin } from '@unproject/core'
import Inspect from 'vite-plugin-inspect'
import { DebugControllerImpl } from './controllers/debug.controller'

class DebugPluginImpl implements UnProjectPlugin {
  name: string = 'unproject:debug'
  private dirname: string = globalThis.__dirname || new URL('.', import.meta.url).pathname

  async beforeStartServer(context: IBeforeStartContext): Promise<void> {
    context
      .addRoute({
        path: '/dashboard/debug',
        name: 'unproject:debug',
        component: path.join(this.dirname, '../src/pages/Debug.vue'),
      })
      .addMenu({
        labelType: 'component',
        label: path.join(this.dirname, '../src/components/DebugLabel.vue'),
        iconType: 'component',
        icon: path.join(this.dirname, '../src/components/DebugIcon.vue'),
        key: 'unproject:debug',
      })
      .addVitePlugin(Inspect())
      .addRpcRoute(DebugControllerImpl)
  }
}

export function DebugPlugin(): UnProjectPlugin {
  return new DebugPluginImpl()
}
export default DebugPlugin
