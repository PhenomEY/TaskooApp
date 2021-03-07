import axios from "axios";
import AdminMain from "components/Admin/Main/Main";

export default {
    name: 'Administration',
    components: { AdminMain },

    data: () => ({
      verifiedAdmin: false
    }),

    mounted() {
      this.setTitle(this.$t('settings.title'));

      if(this.$store.state.user.user.role !== 10) {
        this.$router.push({
          name: 'Dashboard'
        })
      } else {
        this.verifiedAdmin = true
      }
    },

  methods: {
    }
}
