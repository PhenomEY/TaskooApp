import PreviewBox from "./PreviewBox/PreviewBox";
import TaskooDialog from 'src/components/TaskooDialog/TaskooDialog';

export default {
    name: 'TaskooFileViewer',
    components: {PreviewBox, TaskooDialog},

    data() {
        return {
          deleteData: null,
          showDialog: false
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
      API_URL: function () {
        return window.API_URL
      }
    },

    methods: {
      toggleDeleteDialog(data) {
          if(data) {
            this.deleteData = {
              id: data[0],
              index: data.index
            }
          } else {
            this.deleteData = null
          }

          console.log(this.deleteData)
          this.showDialog = !this.showDialog
      },

      deleteFile() {
        if(!this.deleteData) return;

        console.log(this.deleteData)
        this.$emit('delete', this.deleteData)
        this.toggleDeleteDialog(false)
      }
    }
}
