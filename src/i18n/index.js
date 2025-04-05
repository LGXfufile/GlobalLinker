import { createI18n } from 'vue-i18n'

const messages = {
  zh: {
    message: {
      hello: '你好世界'
    }
  },
  en: {
    message: {
      hello: 'hello world'
    }
  }
}

const i18n = createI18n({
  legacy: false, // 使用Composition API
  locale: 'zh',
  fallbackLocale: 'en',
  messages
})

export default i18n 