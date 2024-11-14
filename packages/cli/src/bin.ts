import { ConfigPlugin } from '@nailyjs/config'
import { UncliBootstrap } from './index'

new UncliBootstrap()
  .use(ConfigPlugin())
  .run()
