import TaskooInput from "components/TaskooInput/TaskooInput";
import axios from "axios";

export default {
    name: 'AdminUserCreate',
    components: { TaskooInput },

    data() {
        return {
          invite: true,
          formError: false,
          sendingInvite: false,

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
          this.formError = true;
          this.sendingInvite = false;
          return;
        } else {
          this.formError = false;
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

      setInviteFormValue(name, value) {
        this.inviteForm[name].value = value;
      },


      formValidator(form) {
        let hasErrors = false;

        Object.values(form).forEach((entry) => {
          if(entry.required) {
            entry.error = !entry.value;

            if(entry.error === true) {
              hasErrors = true;
            }
          }
        })

        let returnForm = {
          form: form,
          hasErrors: hasErrors
        };

        return returnForm;

      }
    }
}
