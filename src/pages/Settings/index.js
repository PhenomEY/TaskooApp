import AccountSettings from "./AccountSettings/AccountSettings"

export default {
    name: 'Settings',
    components: {AccountSettings},

    data: () => ({
      user: null
    }),

  computed: {
    currentUser() {
      return this.$store.state.user.user
    }
  },

  mounted() {
      console.log(this.currentUser)
  },

  methods: {
      loadUser() {

      }
    }
}
