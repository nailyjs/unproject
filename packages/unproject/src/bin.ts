import { ConfigPlugin } from '@nailyjs/config'
import { WinstonPlugin } from '@nailyjs/winston'
import { UnProjectBootstrap } from '@unproject/core'

new UnProjectBootstrap()
  .use(ConfigPlugin())
  .use(WinstonPlugin())
  .run()
