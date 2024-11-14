import path from 'node:path'
import { IBeforeStartContext, UnCliPlugin } from '@nailyjs/uncli'

export interface TestPluginOptions {}

class TestPluginImpl implements UnCliPlugin {
  constructor(private readonly options?: Partial<TestPluginOptions>) {}

  name: string = 'uncli:test-plugin'
  private dirname = globalThis.__dirname || new URL('.', import.meta.url).pathname

  async beforeStartServer(context: IBeforeStartContext): Promise<void> {
    context.addRoute({
      path: '/test',
      name: 'uncli:test-page',
      component: path.join(this.dirname, '../pages/TestPage.vue'),
    }).addMenu({
      labelType: 'component',
      label: path.join(this.dirname, '../components/TestLabel.vue'),
      key: 'uncli:test-page',
      iconType: 'component',
      icon: path.join(this.dirname, '../components/TestIcon.vue'),
    } as any)
  }
}

function TestPlugin(options?: TestPluginOptions): UnCliPlugin {
  return new TestPluginImpl(options)
}
export default TestPlugin
