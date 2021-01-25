import TaskooRefresh from "./TaskooRefresh/TaskooRefresh"
import TaskooSelect from "../TaskooSelect/TaskooSelect";
import TaskooSearchfield from "../TaskooSearchfield/TaskooSearchfield";
import axios from "axios";


export default {
    name: 'TaskooTaskbar',

    components: {TaskooRefresh, TaskooSelect, TaskooSearchfield},

    data: () => ({
        refreshInterval: 10,
        currentOrg: 1,
        notificationCount: 0,
        notifications: null
    }),

    mounted() {
        this.getNotifications()
    },

    props: {
    },

    computed: {
    },


    methods: {
        logout() {
            console.log('logout')
            this.$store.commit('setUserToken', null)
            this.$store.commit('setUserId', null)
            this.$store.commit('setVerifiedUser', false)
            this.$router.push({
                name: 'Login'
            })
        },

        orgChanged(val) {
            console.log('org changed to')
            console.log(val)
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
        }
    }
}
