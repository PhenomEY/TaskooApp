import PreviewBox from "./PreviewBox/PreviewBox"

export default {
    name: 'TaskooFileViewer',
    components: {PreviewBox},

    data() {
        return {
        }
    },

    props: {
        files: Array
    },

    watch: {
    },


    mounted() {
    },

    computed: {
      apiURL: function () {
        return window.API_URL
      }
    },

    methods: {
      deleteFile(index, id) {
        this.$emit('delete', {index, id})
      }
    }
}
