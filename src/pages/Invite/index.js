import axios from "axios";
import TaskooInput from "components/TaskooInput/TaskooInput";
import TaskooLoader from "components/TaskooLoader/TaskooLoader";

export default {
    name: 'invite',
    components: {TaskooInput, TaskooLoader},

    data: () => ({
      verifying: true,
      invitedUser: null
    }),

    mounted() {
      this.checkInvite()
    },

  watch: {
    '$route.params.id': function () {
      this.checkInvite()
    }
  },


  methods: {
      checkInvite() {
        axios
          .get(axios.defaults.baseURL+'/invite/'+this.$route.params.id)
          .catch(error => {
            this.$router.push({ name: `Dashboard`});
          })
          .then(response => {
              if(response) {
                this.verifying = false;
              }
          })
      }
    }
}
