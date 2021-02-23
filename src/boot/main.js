import Vue from 'vue'
import axios from 'axios'

import TaskooMixins from '../mixins/TaskooMixins'

import store from '../store'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VTooltip from 'v-tooltip'
import draggable from 'vuedraggable'
import VueToastify from "vue-toastify"
import Skeleton from 'vue-loading-skeleton'
import VueEditor from "vue2-editor"
import VueMoment from 'vue-moment'
import Vue2TouchEvents from 'vue2-touch-events'
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

Vue.use(VueMaterial)
Vue.use(VTooltip)
Vue.use(Skeleton)
Vue.use(VueEditor)
Vue.use(Vue2TouchEvents)

Vue.mixin(TaskooMixins)


//datePicker settings
Vue.material.locale = {
  ...Vue.material.locale,
  dateFormat: 'dd.MM.yyyy',
  firstDayOfAWeek: 1,
}


Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

axios.defaults.baseURL = 'https://api.taskoo.de'

