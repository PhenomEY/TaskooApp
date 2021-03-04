import TaskooInput from "components/TaskooInput/TaskooInput";
import axios from "axios";

export default {
    name: 'AdminUserEdit',
    components: { TaskooInput },

    data() {
      return {
        loading: true,
        password_ver: {
          value: null,
          error: false
        },

        formError: false,
        updatingUser: false,

        userForm: {
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
            required: false
          },
          active: {
            value: false,
            error:false,
            required: false
          }
        },
      }
    },

    mounted() {
      this.getUser()
    },

    watch: {
    },

    props: {
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
              this.loading = false;
              this.userForm.firstname.value = response.data.firstname;
              this.userForm.lastname.value = response.data.lastname;
              this.userForm.email.value = response.data.email;
              this.userForm.active.value = response.data.active;
            }

          })

      },

      toggleInvite(state) {
        this.invite = state
      },

      returnTo() {
        this.$router.push({
          name: 'AdminUser'
        })
      },

      updateUser() {
        if (this.updatingUser === true) return

        const userId = this.$route.params.id;
        this.updatingUser = true;

        //validate form
        const form = this.formValidator(this.userForm);
        this.userForm = form.form;

        if(form.hasErrors === true) {
          this.formError = true;
          this.updatingUser = false;
          return;
        } else {
          this.formError = false;
        }

        axios
          .put(axios.defaults.baseURL+'/user/'+userId, {
            email: form.form.email.value,
            firstname: form.form.firstname.value,
            lastname: form.form.lastname.value,
            password: form.form.password.value,
            active: form.form.active.value
          })
          .catch(error => {
            this.$vToastify.error(error.response.data.message);
            this.updatingUser = false;
          })
          .then(response => {
            if(!response) return;

            if(response.data.success == true) {
              this.$vToastify.success('User updated');
              this.updatingUser = false;
            }

          })
      },

      setUserFormValue(name, value) {
        this.userForm[name].value = value;
      },


      setVerifiedPassword(value) {
        this.password_ver.value = value
      },

      verifyPassword() {

      }
    }
}
