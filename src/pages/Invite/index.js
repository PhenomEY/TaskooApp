import axios from "axios";
import TaskooInput from "components/TaskooInput/TaskooInput";
import TaskooLoader from "components/TaskooLoader/TaskooLoader";

export default {
    name: 'invite',
    components: {TaskooInput, TaskooLoader},

    data: () => ({
      verifying: true,
      invitedUser: null,
      loading: false,
      inviteSuccess: false,
      inviteForm: {
        password: {
          value: null,
          error: false
        },
        password_ver: {
          value:null,
          error:false
        }
      },
      formError: false
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
        const inviteId = this.$route.params.id;

        axios
          .get(axios.defaults.baseURL+'/invite/'+inviteId)
          .catch(error => {
            this.$router.push({ name: `Dashboard`});
          })
          .then(response => {
              if(response) {
                this.verifying = false;
                this.invitedUser = response.data.user;
              }
          })
      },

      setPassword(value) {
          this.inviteForm.password.value = value;
      },
      setPasswordVer(value) {
        this.inviteForm.password_ver.value = value;

        this.inviteForm.password_ver.error = this.inviteForm.password_ver.value !== this.inviteForm.password.value;
      },

      finishInvite() {
        this.loading = true;

        if(this.inviteForm.password_ver.value !== this.inviteForm.password.value || !this.inviteForm.password.value) {
          this.formError = true;
          this.loading = false;
          return;
        }

        const inviteId = this.$route.params.id;

        axios
          .post(axios.defaults.baseURL+'/invite/'+inviteId, {
            password: this.inviteForm.password.value
          })
          .catch(error => {
          })
          .then(response => {
            if(response) {
              this.inviteSuccess = true;

              setTimeout(() => (
                this.$router.push({
                  name: 'Login'
                })
              ), 1500);
            }
          })



      }

    }
}
