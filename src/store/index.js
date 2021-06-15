import Vue from 'vue'
import Vuex from 'vuex'


import auth from './auth'
import user from './user'
import misc from './misc'
import teams from './teams'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      user,
      misc,
      teams
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  console.log('process');
  console.log(process);
  /*
    if we want some HMR magic for it, we handle
    the hot update like below. Notice we guard this
    code with "process.env.DEV" -- so this doesn't
    get into our production build (and it shouldn't).
  */

  // if (process.env.DEV && module.hot) {
  //   module.hot.accept(['./auth'], () => {
  //     const newAuth = require('./auth').default
  //     Store.hotUpdate({ modules: { auth: newAuth } })
  //   })
  // }

  return Store
}
