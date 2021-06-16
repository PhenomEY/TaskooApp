import axios from "axios";
import TaskooInput from "components/TaskooInput/TaskooInput";
import TaskooLoader from "components/TaskooLoader/TaskooLoader";
import TaskooLogo from "components/TaskooLogo/TaskooLogo";

import TaskooInviteService from "src/services/TaskooInviteService";

export default {
    name: 'invite',
    components: {TaskooInput, TaskooLoader, TaskooLogo},

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
      axios.defaults.baseURL = window.API_URL;
      this.checkInvite()
    },

  watch: {
    '$route.params.id': function () {
      this.checkInvite()
    }
  },


  methods: {
      async checkInvite() {
        const inviteId = this.$route.params.id;

        const loaded = await TaskooInviteService.load(inviteId, this);

        if(loaded) {
          this.verifying = false;
          this.invitedUser = loaded.user;
        } else {
          this.$router.push({ name: `Dashboard`});
        }
      },

      setPassword(value) {
          this.inviteForm.password.value = value;
      },
      setPasswordVer(value) {
        this.inviteForm.password_ver.value = value;

        this.inviteForm.password_ver.error = this.inviteForm.password_ver.value !== this.inviteForm.password.value;
      },

      async finishInvite() {
        this.loading = true;

        if(this.inviteForm.password_ver.value !== this.inviteForm.password.value || !this.inviteForm.password.value) {
          this.formError = true;
          this.loading = false;
          return;
        }

        const inviteId = this.$route.params.id;

        const data = {
          password: this.inviteForm.password.value
        }

        const finished = await TaskooInviteService.finish(inviteId, data, this);

        if(finished) {
          this.inviteSuccess = true;

          setTimeout(() => (
            this.$router.push({
              name: 'Login'
            })
          ), 2500);
        }

        this.loading = false;
      }
    }
}
