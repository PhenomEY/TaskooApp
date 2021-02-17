import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from 'src/i18n'

Vue.use(VueI18n)

// const messages = {
//   de,
//   en
// }

const i18n = new VueI18n({
  locale: 'de-DE',
  fallbackLocale: 'de-DE',
  messages
})

export default ({ app }) => {
  // Set i18n instance on app
  app.i18n = i18n
}

export { i18n }
