import path from 'node:path'
import { IBeforeStartContext, UnProjectPlugin } from '@unproject/core'
import { WelcomeControllerImpl } from './controllers/welcome.controller'

export interface TestPluginOptions {}

class TestPluginImpl implements UnProjectPlugin {
  constructor(private readonly options?: Partial<TestPluginOptions>) {}

  name: string = 'uncli:test-plugin'
  private dirname = globalThis.__dirname || new URL('.', import.meta.url).pathname

  async beforeStartServer(context: IBeforeStartContext): Promise<void> {
    context
      .addRoute({
        path: '/test',
        name: 'uncli:test-page',
        component: path.join(this.dirname, '../src/pages/TestPage.vue'),
      })
      .addMenu({
        labelType: 'component',
        label: path.join(this.dirname, '../src/components/TestLabel.vue'),
        key: 'uncli:test-page',
        iconType: 'component',
        icon: path.join(this.dirname, '../src/components/TestIcon.vue'),
      } as any)
      .addRpcRoute(WelcomeControllerImpl)
  }
}

function TestPlugin(options?: TestPluginOptions): UnProjectPlugin {
  return new TestPluginImpl(options)
}
export default TestPlugin
