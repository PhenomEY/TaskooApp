import TaskooBoxedContent from 'src/components/TaskooBoxedContent/TaskooBoxedContent';
import TaskooBoxedNavEntry from 'src/components/TaskooBoxedContent/TaskooBoxedNavEntry/TaskooBoxedNavEntry';

import AccountSettings from "./AccountSettings/AccountSettings";
import UserService from "src/services/TaskooUserService";

export default {
    name: 'Settings',
    components: {AccountSettings, TaskooBoxedContent, TaskooBoxedNavEntry},

    data: () => ({
      user: null
    }),

  computed: {
    currentUser() {
      return this.$store.state.user.user
    }
  },

  watch: {
    "$route": function () {
      this.loadUser()
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
      this.$store.commit('misc/updateAppData', true);
    },

    setColor(color) {
      this.user.color = color;
      this.$store.commit('misc/updateAppData', true);
    }

    }
}
