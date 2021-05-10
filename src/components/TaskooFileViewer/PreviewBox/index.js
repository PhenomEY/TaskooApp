export default {
    name: 'PreviewBox',
    components: {},

    data() {
        return {
          imageTypes: [
            'jpg',
            'jpeg',
            'png',
            'gif',
            'svg'
          ]
        }
    },

    props: {
        file: Object
    },

    watch: {
    },


    mounted() {
    },

    computed: {
      API_URL: function () {
        return window.API_URL
      }
    },

    methods: {
      isImage(fileExtension) {
        return this.imageTypes.includes(fileExtension)
      },

      deleteFile(id) {
        this.$emit('delete', id)
      }
    }
}
