import TaskooLayout from "./layout/TaskooLayout/TaskooLayout";
import TaskooLoader from "components/TaskooLoader/TaskooLoader";
import axios from "axios";

import AuthService from "src/services/TaskooAuthService";

export default {
  name: 'taskoo',
  components: {TaskooLayout, TaskooLoader},
  data: () => ({
    test: true,
    screenWidth: window.innerWidth,
    publicUrls: [
      'Login',
      'Invite',
      'File'
    ]
  }),

  watch: {
    '$store.state.misc.updateAppData': function() {
      if(this.$store.state.misc.updateAppData == true) {
        this.updateAppData()
      }
    },
  },

  beforeUpdate() {
    if(!this.verifiedUser && !this.publicUrls.includes(this.$route.name)) {
      this.checkAuth()
    }
  },

  mounted() {
    axios.defaults.headers.common['Authorization'] = this.$store.state.auth.authToken
    axios.defaults.baseURL = window.API_URL

    console.log('CONFIG:');
    console.log(window.API_URL)

    if (this.$store.state.misc.isDark === 'true') {
      document.body.classList.add('taskoo-dark-theme');
    } else {
      document.body.classList.remove('taskoo-dark-theme');
    }

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

    console.log('ROUTE:');
    console.log(this.$route)
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
    async checkAuth() {
      const checked = await AuthService.check(this);

      if(checked) {
        setTimeout(() => {
          this.$store.commit('auth/setVerifiedUser', true)
          this.$store.commit('user/setUser', checked.user)
          if (checked.teams) {
            this.$store.commit('teams/setAvailableTeams', checked.teams)
          }
        }, 700);
      } else {
        setTimeout(() => (
          this.$router.push({
            name: 'Login'
          })
        ), 700);
      }
    },

    async updateAppData() {
      const update = await AuthService.update();

      if(update) {
        this.$store.commit('user/setUser', update.user)
        if (update.teams) {
          this.$store.commit('teams/setAvailableTeams', update.teams)
        }

        this.$store.commit('misc/updateAppData', false);
      }
    }
  }
}
