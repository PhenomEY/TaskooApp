import axios from "axios";
import AdminMain from "components/Admin/Main/Main";

export default {
    name: 'Administration',
    components: { AdminMain },

    data: () => ({
    }),

    mounted() {
      this.setTitle(this.$t('settings.title'));
    },

  methods: {
    }
}
