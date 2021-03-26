import axios from "axios";

export default {
    name: 'AdminUser',
    components: {},

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
