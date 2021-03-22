import axios from "axios";
import AdminMain from "./Main/Main";

export default {
    name: 'Administration',
    components: { AdminMain },

    data: () => ({
      verifiedAdmin: false
    }),

    mounted() {
      this.setTitle(this.$t('settings.title'));

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
