<template>
  <div id="q-app">

    <router-view v-if="publicUrls.includes($route.name)"></router-view>

    <layout-sidebar #content v-else-if="verifiedUser">
      <router-view></router-view>
    </layout-sidebar>

    <taskoo-loader v-else></taskoo-loader>
  </div>
</template>

<script>
  import LayoutSidebar from "./layout/LayoutSidebar";
  import TaskooLoader from "components/TaskooLoader/TaskooLoader";
  import axios from "axios";
  import store from "src/store";
  export default {
    name: 'taskoo',
    components: {LayoutSidebar, TaskooLoader},
    data: () => ({
      test: true,
      screenWidth: window.innerWidth,
      publicUrls: [
        'Login',
        'Invite'
      ]
    }),

    watch: {
      verifiedUser: function(val) {
        if(val === true) {
          this.getOrganisations();
        }
      }
    },

    beforeUpdate() {
      if(!this.verifiedUser && !this.publicUrls.includes(this.$route.name)) {
        this.checkAuth()
      }
    },

    mounted() {
      axios.defaults.headers.common['Authorization'] = this.$store.state.auth.authToken
      console.log('mounted')


      //if site isnt public, check for auth
      if(!this.publicUrls.includes(this.$route.name)) {
        this.checkAuth()
      }


      this.setTitle(this.$t('taskoo.title'));

      if(this.screenWidth < 600) {
        this.$store.commit('misc/toggleMobile', true)
      }

      //check if screen is mobile to disable dragging
      window.onresize = () => {
        this.screenWidth = window.innerWidth

        if(this.screenWidth < 600) {
          this.$store.commit('misc/toggleMobile', true)
        } else {
          this.$store.commit('misc/toggleMobile', false)
        }
      }
    },

    computed: {
      loggingIn: function() {
        return this.$store.state.auth.loggingIn
      },

      verifiedUser: function() {
        return this.$store.state.auth.verifiedUser
      }
    },

    methods: {
      getOrganisations() {
        axios
            .get(axios.defaults.baseURL+'/organisation/get')
            .catch(function (error) {
            })
            .then(response => {
              if(response.data.success == true) {
                this.$store.commit('setOrganisations', response.data.organisations)
              } else {
              }
            })
      },

      checkAuth() {
        axios
          .get(axios.defaults.baseURL+'/auth/check')
          .catch(function (error) {
          })
          .then(response => {

            if(!response) {
              setTimeout(() => (
                this.$router.push({
                  name: 'Login'
                })
              ), 700);
              return;
            }

            else if(response.data.success == true) {
              setTimeout(() => (
                this.$store.commit('auth/setVerifiedUser', true),
                  this.$store.commit('user/setUser', response.data.user)
              ), 700);
            } else {
              setTimeout(() => (
                this.$router.push({
                  name: 'Login'
                })
              ), 700);
            }
          })
      }
    }
  }
</script>

<style src="./app.scss" lang="scss">
</style>
