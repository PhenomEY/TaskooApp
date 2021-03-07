import axios from "axios";

export default {
    name: 'AdminOrganisations',
    components: {},

    data() {
        return {
          loading: true,
          organisations: null
        }
    },

    mounted() {
      this.load()
    },

    watch: {
    },

    props: {
    },

    computed: {
    },


    methods: {
      load() {
        this.loading = true

        axios
          .get(axios.defaults.baseURL+'/organisation')
          .catch(function (error) {
          })
          .then(response => {
            this.organisations = response.data.organisations
          })
      }
    }
}
