import { ConfigPlugin } from '@nailyjs/config'
import { UnProjectBootstrap } from '@unproject/core'

new UnProjectBootstrap()
  .use(ConfigPlugin())
  .run()
