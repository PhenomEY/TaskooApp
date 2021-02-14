import axios from "axios";
import TaskooInput from "../../components/TaskooInput/TaskooInput";

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
        login() {
            this.sending = true

            axios
                .post(axios.defaults.baseURL+'/auth/login', {
                    login: {
                        username: this.username,
                        password: this.password
                    }
                })
                .catch(error => {
                  this.formError = true;
                })
                .then(response => {
                  if(!response) {
                    return
                  }

                  if(response.data.success == true) {
                        this.$store.commit('auth/setAuthToken', response.data.auth)
                        this.$store.commit('user/setUser', response.data.user)
                        this.$store.commit('auth/setVerifiedUser', true)
                        this.$router.push({
                            name: 'Dashboard'
                        });
                    }

                })
        },

        setUsername(val) {
            this.username = val
        },

        setPassword(val) {
            this.password = val
        },
    }
}
