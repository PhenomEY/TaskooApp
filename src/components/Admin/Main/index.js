import TaskooInput from "components/TaskooInput/TaskooInput";
import axios from "axios";

export default {
    name: 'AdminMain',
    components: { TaskooInput },

    data() {
        return {
          settings: {
            app_url: null
          },
          loading: true
        }
    },

    mounted() {
      this.getMainSettings()
    },

    watch: {
    },

    props: {
    },

    computed: {
    },


    methods: {
      getMainSettings() {
        axios
          .get(axios.defaults.baseURL+'/admin/main')
          .catch(error => {
          })
          .then(response => {
            if(!response) {
              return
            }

            if(response.data.success == true) {
              this.settings.app_url = response.data.app_url;
              this.loading = false
            }

          })
      },

      setAppURL(value) {
        this.settings.app_url = value
      },

      saveMainSettings() {
        const settings = this.settings;

        if(this.loading) return

        axios
          .post(axios.defaults.baseURL+'/admin/main', {
            settings: settings
          })
          .catch(function (error) {
          })
          .then(response => {
            if(response.data.success === true) {
              this.$vToastify.success("Saved");
            }
          })
      }
    }
}
