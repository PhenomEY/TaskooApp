import TaskooSearchfield from "src/components/TaskooSearchfield/TaskooSearchfield";
import TaskooIconButton from "src/components/TaskooIconButton/TaskooIconButton"
import Multiselect from 'vue-multiselect'
import axios from "axios";


export default {
    name: 'TaskooTaskbar',

    components: {TaskooSearchfield, Multiselect, TaskooIconButton},

    data: () => ({
        refreshInterval: 10,
        notificationCount: 0,
        notifications: null
    }),

    computed: {
      currentTeam: {
        // getter
        get: function () {
          return this.$store.state.teams.currentTeam
        },
        // setter
        set: function (newValue) {
          this.$store.commit('teams/saveTeam', newValue)
        }
      },

      availableTeams() {
        return this.$store.state.teams.availableTeams
      },

      isDark() {
        return this.$store.state.misc.isDark
      },

      currentUser() {
        return this.$store.state.user.user
      },

      API_URL: function () {
        return window.API_URL
      }
    },

    props: {
    },

    mounted() {
      this.getNotifications()
    },


    methods: {
        getNotifications() {
            axios
                .get(axios.defaults.baseURL+'/user/notifications')
                .catch(error => {
                    this.notFound = true
                })
                .then(response => {
                    if(!response) {
                        return
                    }

                    if(response.data.success == true) {
                        this.notifications = response.data.notifications
                        this.notificationCount = this.notifications.length
                    }

                })
        },

        closedNotifications() {
            this.notificationCount = 0;
            this.notifications = null;
        },

      toggleMenu() {
        let body = document.body;
          if(!body.classList.contains('open-menu')) {
            body.classList.add('open-menu')
          } else {
            body.classList.remove('open-menu')
          }
      },

      toggleViewMode() {
          console.log(this.isDark)
          if(!this.isDark || this.isDark == 'false') {
            this.$store.commit('misc/toggleDarkMode', true);
          } else {
            this.$store.commit('misc/toggleDarkMode', false);
          }
      }
    }
}
