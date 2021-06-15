export default {
    name: 'TaskooAvatar',

    props: {
      user: {
        type: [Array, Object]
      }
    },

    data() {
      return {
      }
    },

    watch: {
    },

    computed: {
      API_URL: function () {
        return window.API_URL
      },
    },

    methods: {
    }
}
