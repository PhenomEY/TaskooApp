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
    userId: Number
  },

  mounted() {
    //set title
    this.setTitle(this.$t('settings.account_settings.title'));
    this.loadUser()
  },


  methods: {
    async loadUser() {
        const userId = this.userId
        const loaded = await UserService.load(userId , this);

        if(loaded) {
          this.userForm.firstname.value = loaded.firstname
          this.userForm.lastname.value = loaded.lastname
          this.dataForm.email.oldVal = loaded.email
        }
    },

    updateUser() {
      const userId = this.userId
      const validated = FormValidator.validate(this.userForm)

      this.userForm = validated.form;

      const formData = {
        firstname: this.userForm.firstname.value,
        lastname: this.userForm.lastname.value
      }

      const updated = UserService.update(userId, formData, this, true);
    },

    setUserFormValue(name, value) {
      this.userForm[name].value = value;
    },

    setDataFormValue(name, value) {
      this.dataForm[name].value = value;
    },

    async updateUserData() {
      const userId = this.userId
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
