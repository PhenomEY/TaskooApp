import Vue from 'vue'
import axios from 'axios'

import TaskooMixins from '../mixins/TaskooMixins'

import VTooltip from 'v-tooltip'
import VueToastify from "vue-toastify"
import Skeleton from 'vue-loading-skeleton'
import VueEditor from "vue2-editor"
import VueMoment from 'vue-moment'
import Vue2TouchEvents from 'vue2-touch-events'
import VueCookies from 'vue-cookies'
const moment = require('moment')
require('moment/locale/de')


Vue.use(VueToastify, {
  position: 'top-right',
  hideProgressbar: true,
  theme: 'taskoo'
});

Vue.use(VueMoment, {
  moment
});

Vue.use(VTooltip)
Vue.use(Skeleton)
Vue.use(VueEditor)
Vue.use(Vue2TouchEvents)
Vue.use(VueCookies)

Vue.mixin(TaskooMixins)


Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false



