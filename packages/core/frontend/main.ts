import defu from 'defu'
import { get } from 'lodash-es'
import config from 'virtual:uncli:config'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './Root.vue'
import router from './router'

import '@unproject/components/css'
import 'uno.css'

const i18n = createI18n({
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages: defu(get(config, 'i18n', {}), {
    'zh-CN': {},
    'en': {},
  }),
})

createApp(App)
  .use(router)
  .use(i18n)
  .mount('#app')
