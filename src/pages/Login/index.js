import TaskooInput from "../../components/TaskooInput/TaskooInput";
import TaskooLogo from "components/TaskooLogo/TaskooLogo";

import AuthService from "src/services/TaskooAuthService";

export default {
    name: 'login',
    components: {TaskooInput, TaskooLogo},

    data: () => ({
        username: null,
        password: null,
        sending: false,
        formError: false
    }),
    methods: {
        async login() {
            this.sending = true

            const formData = {
              login: {
                username: this.username,
                password: this.password
              }
            }

            const loggedIn = await AuthService.login(formData, this, false, false);

            if(loggedIn) {
              this.$store.commit('auth/setAuthToken', loggedIn.auth)
              this.$store.commit('user/setUser', loggedIn.user)
              this.$store.commit('auth/setVerifiedUser', true)
              if(loggedIn.teams) {
                this.$store.commit('teams/setAvailableTeams', loggedIn.teams)
              } else {
                this.$store.commit('teams/setAvailableTeams', [])
              }

              console.log(this.$store.state.teams.currentOrganisation)
              console.log(this.$store.state.teams.availableOrganisations)

              this.$router.push({
                name: 'Dashboard'
              });
            } else {
              this.formError = true;
            }
        },

        setUsername(val) {
            this.username = val
        },

        setPassword(val) {
            this.password = val
        },
    }
}
