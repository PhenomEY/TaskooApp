import AccountSettings from "./AccountSettings/AccountSettings"
import UserService from "src/services/TaskooUserService";

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
      this.loadUser()
  },

  methods: {
    async loadUser() {
      const userId = this.currentUser.id
      const loaded = await UserService.load(userId , this);

      if(loaded) {
        this.user = loaded
      }
    },

    setAvatar(avatar) {
      this.user.avatar = avatar;
    },

    setColor(color) {
      this.user.color = color;
    }

    }
}
