import AdminMain from "./Main/Main";
import TaskooBoxedContent from "src/components/TaskooBoxedContent/TaskooBoxedContent"
import TaskooBoxedNavEntry from "src/components/TaskooBoxedContent/TaskooBoxedNavEntry/TaskooBoxedNavEntry"

export default {
    name: 'Administration',
    components: { AdminMain, TaskooBoxedContent, TaskooBoxedNavEntry },

    data: () => ({
      verifiedAdmin: false
    }),

    mounted() {
      this.setTitle(this.$t('administration.title'));

      if(this.$store.state.user.user.permissions && this.$store.state.user.user.permissions.administration) {
        this.verifiedAdmin = true
      } else {
        this.$router.push({
          name: 'Dashboard'
        })
      }
    },

  methods: {
    }
}
