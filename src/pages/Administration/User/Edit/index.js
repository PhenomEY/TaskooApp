import TaskooInput from "components/TaskooInput/TaskooInput";
import Multiselect from 'vue-multiselect'

import FormValidator from "src/handlers/FormValidator";
import UserService from "src/services/TaskooUserService";

import axios from "axios";

export default {
    name: 'AdminUserEdit',
    components: { TaskooInput, Multiselect },

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

        organisations: null,
        assignedOrganisations: null,
        userRole: null,
        permissions: {
          administration: false,
          project_edit: false,
          project_create: false
      },
      }
    },

    mounted() {
      this.getUser()
      this.getOrganisations()
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
              this.assignedOrganisations = response.data.organisations;
              this.permissions = response.data.permissions;
            }

          })

      },

      getOrganisations() {
        axios
          .get(axios.defaults.baseURL+'/organisation')
          .catch(function (error) {
          })
          .then(response => {
            this.organisations = response.data.organisations
          })
      },

      toggleInvite(state) {
        this.invite = state
      },

      returnTo() {
        this.$emit('return', true);

        this.$router.push({
          name: 'AdminUser'
        })
      },

      async updateUser() {
        if (this.updatingUser === true) return

        const userId = this.$route.params.id;
        this.updatingUser = true;
        const permissions = this.permissions;

        //validate form
        const form = FormValidator.validate(this.userForm);
        this.userForm = form.form;

        if(form.hasErrors === true) {
          this.formError = true;
          this.updatingUser = false;
          return;
        } else {
          this.formError = false;
        }

        if(form.form.password.value != this.password_ver.value) {
          this.password_ver.error = true;
          this.formError = true;
          this.updatingUser = false;
          return;
        } else {
          this.password_ver.error = false;
          this.formError = false;
        }

        const formData = {
          email: form.form.email.value,
          firstname: form.form.firstname.value,
          lastname: form.form.lastname.value,
          password: form.form.password.value,
          active: form.form.active.value,
          permissions: permissions
        }

        const updated = await UserService.update(userId, formData, this, true)
        this.updatingUser = false;
      },

      setUserFormValue(name, value) {
        this.userForm[name].value = value;
      },


      setVerifiedPassword(value) {
        this.password_ver.value = value
      },

      verifyPassword() {

      },

      setOrganisation(organisation) {
        const userId = this.$route.params.id;

        axios
          .put(axios.defaults.baseURL+'/user/'+userId, {
            addOrganisation: organisation.id
          })
          .catch(error => {
          })
          .then(response => {
            console.log(response)
          })
      },

      removeOrganisation(organisation) {
        const userId = this.$route.params.id;

        axios
          .put(axios.defaults.baseURL+'/user/'+userId, {
            removeOrganisation: organisation.id
          })
          .catch(error => {
          })
          .then(response => {
            console.log(response)
          })
      }
    }
}
