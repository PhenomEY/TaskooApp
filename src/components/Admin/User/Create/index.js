export default {
    name: 'AdminUserCreate',
    components: {},

    data() {
        return {
          invite: true
        }
    },

    mounted() {
    },

    watch: {
    },

    props: {
    },

    computed: {
    },


    methods: {
      toggleInvite(state) {
        this.invite = state
      },

      returnTo() {
        this.$router.push({
          name: 'AdminUser'
        })
      }
    }
}
