import TaskooInput from "components/TaskooInput/TaskooInput";
import axios from "axios";

export default {
    name: 'AdminMain',
    components: { TaskooInput },

    data() {
        return {
          settings: null,
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
        this.loading = true

        axios
          .get(axios.defaults.baseURL+'/admin/main')
          .catch(error => {
            this.$vToastify.error(error.response.data.detail);
          })
          .then(response => {
            if(!response) {
              return
            }

            if(response.data.success == true) {
              this.settings = response.data.settings;
            }
            this.loading = false
          })
      },

      setAppURL(value) {
        this.settings.app_url = value
      },

      setMailSender(value) {
        this.settings.sender = value
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
              this.$vToastify.success("settings_saved");
            }
          })
      }
    }
}
