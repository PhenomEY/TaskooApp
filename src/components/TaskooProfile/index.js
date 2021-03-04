import axios from "axios";

export default {
    name: 'TaskooProfile',
    components: {},

    data() {
        return {
          loading:false
        }
    },

    props: {
        label: String
    },

    watch: {
    },


    mounted() {
      this.getUser()
    },

    computed: {
    },

    methods: {
      getUser() {
        const userId = this.$route.params.id;
        this.loading = true;

        axios
          .get(axios.defaults.baseURL+'/user/'+userId)
          .catch(error => {
          })
          .then(response => {
            if(!response) return;

            if(response.data.success == true) {
            }

          })

      },
    }
}
