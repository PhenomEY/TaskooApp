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
                .catch(function (error) {
                })
                .then(response => {
                    if (response.data.success == false) {
                        this.formError = true;

                    } else if(response.data.success == true) {
                        this.$store.commit('setAuthToken', response.data.auth)
                        console.log(localStorage.getItem('authToken'));
                        this.$store.commit('setUser', response.data.user)
                        this.$store.commit('setVerifiedUser', true)
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
