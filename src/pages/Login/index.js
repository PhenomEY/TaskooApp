import axios from "axios";
import TaskooInput from "../../components/TaskooInput/TaskooInput";

import AuthService from "src/services/TaskooAuthService";

export default {
    name: 'login',
    components: {TaskooInput},

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

            const loggedIn = await AuthService.login(formData, this);

            if(loggedIn) {
              this.$store.commit('auth/setAuthToken', loggedIn.auth)
              this.$store.commit('user/setUser', loggedIn.user)
              this.$store.commit('auth/setVerifiedUser', true)
              this.$store.commit('organisations/setAvailableOrganisations', loggedIn.organisations)
              this.$router.push({
                name: 'Dashboard'
              });
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
