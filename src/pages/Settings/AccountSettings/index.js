import TaskooInput from "components/TaskooInput/TaskooInput";

import UserService from "src/services/TaskooUserService"

import FormValidator from "src/handlers/FormValidator";

export default {
  name: 'AccountSettings',
  components: {TaskooInput},

  data() {
    return {
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
      },

      dataForm: {
        password_ver: {
          value: null,
          error: false
        },

        password_current: {
          value: null,
          error: false,
          required: true
        },

        password: {
          value: null,
          error: false
        },

        email: {
          value: null,
          error: false,
          oldVal: null
        },
      },

      updatingUser: false
    }
  },

  props: {
    user: Object
  },

  watch: {
    user: function () {
      this.setUserData()
    }
  },

  mounted() {
    if(this.$route.name !== 'Settings') {
      return;
    }

    //set title
    this.setTitle(this.$t('settings.account_settings.title'));
  },


  methods: {
    setUserData() {
      this.userForm.firstname.value = this.user.firstname
      this.userForm.lastname.value = this.user.lastname
      this.dataForm.email.oldVal = this.user.email
    },

    async updateUser() {
      const userId = this.user.id
      const validated = FormValidator.validate(this.userForm)

      this.userForm = validated.form;

      const formData = {
        firstname: this.userForm.firstname.value,
        lastname: this.userForm.lastname.value
      }

      if(validated.hasErrors) return;

      const updated = await UserService.update(userId, formData, this, true);

      if(updated) this.$store.commit('misc/updateAppData', true);
    },

    setUserFormValue(name, value) {
      this.userForm[name].value = value;
    },

    setDataFormValue(name, value) {
      this.dataForm[name].value = value;
    },

    async updateUserData() {
      const userId = this.user.id
      const validated = FormValidator.validate(this.dataForm)

      this.dataForm = validated.form;

      if(this.dataForm.password.value) {
        if(this.dataForm.password.value !== this.dataForm.password_ver.value) {
          this.dataForm.password_ver.error = true
          return;
        } else {
          this.dataForm.password_ver.error = false
        }
      }

      const formData = {
        email: this.dataForm.email.value,
        password: this.dataForm.password.value,
        password_current: this.dataForm.password_current.value
      }

      if(formData.email || formData.password) {
        const updated = UserService.update(userId, formData, this, true);
      }
    }
  }
}
