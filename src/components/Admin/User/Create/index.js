import TaskooInput from "components/TaskooInput/TaskooInput";
import axios from "axios";

export default {
    name: 'AdminUserCreate',
    components: { TaskooInput },

    data() {
        return {
          invite: true,
          inviteError: false,
          createError: false,
          sendingInvite: false,
          creatingUser: false,
          password_ver: {
            value: null,
            error: false
          },

          inviteForm: {
            firstname: {
              value: null,
              error: false,
              required: true
            },
            lastname: {
              value: null,
              error: false,
              required: true
            },
            email: {
              value: null,
              error: false,
              required: true
            },
          },

          manualForm: {
            firstname: {
              value: null,
              error: false,
              required: true
            },
            lastname: {
              value: null,
              error: false,
              required: true
            },
            email: {
              value: null,
              error: false,
              required: true
            },

            password: {
              value: null,
              error: false,
              required: true
            }
          }
        }
    },

    mounted() {
    },

    watch: {
    },

    props: {
    },

    computed: {
    },


    methods: {
      toggleInvite(state) {
        this.invite = state
      },

      returnTo() {
        this.$router.push({
          name: 'AdminUser'
        })
      },

      sendInvite() {
        if (this.sendingInvite === true) return

        this.sendingInvite = true;

        //validate form
        const form = this.formValidator(this.inviteForm);
        this.inviteForm = form.form;

        if(form.hasErrors === true) {
          this.inviteError = true;
          this.sendingInvite = false;
          return;
        } else {
          this.inviteError = false;
        }

        axios
          .post(axios.defaults.baseURL+'/invite', {
            email: form.form.email.value,
            firstname: form.form.firstname.value,
            lastname: form.form.lastname.value
          })
          .catch(error => {
            this.$vToastify.error(error.response.data.message);
            this.sendingInvite = false;
          })
          .then(response => {
            if(!response) return;

            if(response.data.success == true) {
              this.$vToastify.success('User invited');
              this.sendingInvite = false;
            }

          })
      },

      createUser() {
        if (this.creatingUser === true) return

        this.creatingUser = true;

        //validate form
        const form = this.formValidator(this.manualForm);
        this.manualForm = form.form;

        if(form.hasErrors === true) {
          this.createError = true;
          this.creatingUser = false;
          return;
        } else {
          this.createError = false;
        }

        if(form.form.password.value !== this.password_ver.value) {
          this.password_ver.error = true;
          this.creatingUser = false
          return;
        } else {
          this.password_ver.error = false;
        }

        axios
          .post(axios.defaults.baseURL+'/user', {
            email: form.form.email.value,
            firstname: form.form.firstname.value,
            lastname: form.form.lastname.value,
            password: form.form.password.value
          })
          .catch(error => {
            this.$vToastify.error(error.response.data.message);
            this.creatingUser = false;
          })
          .then(response => {
            if(!response) return;

            if(response.data.success == true) {
              this.$vToastify.success('User created');
              this.creatingUser = false;
            }

          })
      },

      setInviteFormValue(name, value) {
        this.inviteForm[name].value = value;
      },

      setManualFormValue(name, value) {
        this.manualForm[name].value = value;
      },

      setVerifiedPassword(value) {
        this.password_ver.value = value
      },

      verifyPassword() {

      }
    }
}
