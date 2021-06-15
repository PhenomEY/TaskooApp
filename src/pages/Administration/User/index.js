import axios from "axios";

import TaskooIconButton from 'src/components/TaskooIconButton/TaskooIconButton'
import TaskooAvatar from 'src/components/TaskooAvatar/TaskooAvatar'
import TaskooLoaderCircle from 'src/components/TaskooLoaderCircle/TaskooLoaderCircle'

export default {
    name: 'AdminUser',
    components: { TaskooIconButton, TaskooAvatar, TaskooLoaderCircle },

    data() {
        return {
          users:null,
          loading:true
        }
    },

    mounted() {
      this.getUsers()
    },

    watch: {
    },

    props: {
    },

    computed: {
    },


    methods: {
      getUsers() {
        this.loading = true

        axios
          .get(axios.defaults.baseURL+'/users')
          .catch(function (error) {
          })
          .then(response => {
            this.loading = false
            this.users = response.data.users;
          })
      },

      createUser() {
        this.$router.push({
          name: 'AdminUserCreate'
        })
      },

      reload() {
        this.getUsers()
      }
    }
}
