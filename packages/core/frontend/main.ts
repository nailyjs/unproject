import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'

import '@unproject/components/css'
import 'uno.css'

const i18n = createI18n({
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': {},
  },
})

createApp(App)
  .use(router)
  .use(i18n)
  .mount('#app')
