import TaskooAvatar from "src/components/TaskooAvatar/TaskooAvatar"
import axios from "axios";

export default {
    name: 'TeamPage',
    components: { TaskooAvatar },

    data() {
        return {
          teams: null,
          loading: false
        }
    },


    watch: {
    },

    mounted() {
      this.load()
    },

    computed: {
    },

    methods: {
      load() {
        this.loading = true

        axios
          .get(axios.defaults.baseURL+'/teampage')
          .catch(error => {
            this.$vToastify.error(error.response.data.detail);
            this.loading = false
          })
          .then(response => {
            if(!response) return;
            this.teams = response.data.teams;
            this.loading = false
          })


      },

      reverseColumns(columns) {
        console.log(Object.values(columns).reverse())
        return Object.values(columns).slice().reverse()
      },

      openTeam(id) {
        const element = this.$refs['team-'+id][0];
        if(element.classList.contains('active')) {
          element.classList.remove('active')
        } else {
          element.classList.add('active')
        }
      }
    }
}
