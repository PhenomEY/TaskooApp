import TaskooRefresh from "./TaskooRefresh/TaskooRefresh"
import TaskooSearchfield from "../TaskooSearchfield/TaskooSearchfield";
import Multiselect from 'vue-multiselect'
import axios from "axios";


export default {
    name: 'TaskooTaskbar',

    components: {TaskooRefresh, TaskooSearchfield, Multiselect},

    data: () => ({
        refreshInterval: 10,
        notificationCount: 0,
        notifications: null
    }),

    mounted() {
        this.getNotifications()
    },

    props: {
    },

    computed: {
      currentOrganisation: {
        // getter
        get: function () {
          return this.$store.state.organisations.currentOrganisation
        },
        // setter
        set: function (newValue) {
          this.$store.commit('organisations/saveOrganisation', newValue)
        }

      },

      availableOrganisations() {
        return this.$store.state.organisations.availableOrganisations
      },

      isDark() {
        return this.$store.state.misc.isDark
      },
    },


    methods: {
        logout() {
            console.log('logout')
            this.$store.commit('auth/setAuthToken', null)
            this.$store.commit('auth/setVerifiedUser', false)
            this.$router.push({
                name: 'Login'
            })
        },

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
