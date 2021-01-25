import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
      contentRefresh: false,
      contentRefreshActive: localStorage.getItem('contentRefreshActive'),
      loggingIn: false,
      authToken: localStorage.getItem('authToken'),
      user: null,
      verifiedUser: false,
      organisations: null,
      currentOrg: localStorage.getItem('currentOrg'),
      isMobile: false

  },

  getters: {
    // Here we will create a getter
  },

  mutations: {
    toggleMobile(state, value) {
      state.isMobile = value
    },

    toggleRefresh(state, value) {
      state.contentRefresh = value
    },

    toggleRefreshActive(state, value) {
      state.contentRefreshActive = value
      localStorage.setItem('contentRefreshActive', value)
    },

    toggleLoggingIn(state, value) {
      if(value == false) {
        setTimeout(() => (
            state.loggingIn = value
        ), 1000);
      } else {
        state.loggingIn = value
      }
    },

    setAuthToken(state, value) {
      localStorage.setItem('authToken', value);
      state.authToken = value
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('authToken');
    },


    setVerifiedUser(state, value) {
      state.verifiedUser = value
    },

    setUser(state, value) {
      state.user = value
      console.log(state.user)
    },

    setOrganisations(state, value) {
      state.organisations = value
    },

    setCurrentOrg(state, value) {
      state.currentOrg = value
      localStorage.setItem('currentOrg', value)
    },
  },

  actions: {
  }
});