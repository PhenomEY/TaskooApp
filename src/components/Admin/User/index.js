import axios from "axios";

export default {
    name: 'AdminUser',
    components: {},

    data() {
        return {
          users:null
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
        axios
          .get(axios.defaults.baseURL+'/users')
          .catch(function (error) {
          })
          .then(response => {
            this.users = response.data.users;
          })
      },

      createUser() {
        this.$router.push({
          name: 'AdminUserCreate'
        })
      }
    }
}
