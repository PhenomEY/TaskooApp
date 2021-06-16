import TaskooInput from "components/TaskooInput/TaskooInput";
import Multiselect from 'vue-multiselect'
import TaskooSwitch from "components/TaskooSwitch/TaskooSwitch";
import TaskooIconButton from "components/TaskooIconButton/TaskooIconButton";
import TaskooAvatar from 'src/components/TaskooAvatar/TaskooAvatar';
import TaskooDialog from 'src/components/TaskooDialog/TaskooDialog';

import FormValidator from "src/handlers/FormValidator";
import UserService from "src/services/TaskooUserService";

import axios from "axios";
import TaskooUserService from "src/services/TaskooUserService";

export default {
    name: 'AdminUserEdit',
    components: { TaskooInput, Multiselect, TaskooSwitch, TaskooIconButton, TaskooAvatar, TaskooDialog },

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

        teams: null,
        assignedTeams: null,
        availableRoles: null,
        userRole: null,
        permissions: {
          administration: false,
          project_edit: false,
          project_create: false
       },
        user: null,
        showDeleteDialog: false
      }
    },

    mounted() {
      this.getUser()
      this.getTeams()
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
              this.assignedTeams = response.data.teams;
              this.permissions = response.data.permissions;
              this.availableRoles = response.data.availableRoles;
              this.userRole = response.data.teamrole;
              this.user = response.data;
            }

          })

      },

      getTeams() {
        axios
          .get(axios.defaults.baseURL+'/team')
          .catch(function (error) {
          })
          .then(response => {
            this.teams = response.data.teams
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

        let formData = {
          email: form.form.email.value,
          firstname: form.form.firstname.value,
          lastname: form.form.lastname.value,
          password: form.form.password.value,
          active: form.form.active.value,
          permissions: permissions,
          teamRole: null
        }

        if(this.userRole) {
          formData.teamRole = this.userRole.id
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

      setTeam(team) {
        const userId = this.$route.params.id;

        axios
          .put(axios.defaults.baseURL+'/user/'+userId, {
            addTeam: team.id
          })
          .catch(error => {
          })
          .then(response => {
            console.log(response)
          })
      },

      removeTeam(team) {
        const userId = this.$route.params.id;

        axios
          .put(axios.defaults.baseURL+'/user/'+userId, {
            removeTeam: team.id
          })
          .catch(error => {
          })
          .then(response => {
            console.log(response)
          })
      },

      async deleteUser() {
        const userId = this.$route.params.id;

        const deleted = await TaskooUserService.delete(userId, this);

        if(deleted) {
          this.$router.push({
            name: 'AdminUser'
          });
        }
      },

      toggleDeleteDialog() {
        this.showDeleteDialog = !this.showDeleteDialog
      }
    }
}
