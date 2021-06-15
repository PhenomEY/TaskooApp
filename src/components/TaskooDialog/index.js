export default {
    name: 'TaskooDialog',
    components: {},
    data() {
        return {
          isActive: this.active
        }
    },

    props: {
        confirmText: String,
        cancelText: String,
        active: Boolean,
        content: String,
        title: String
    },

    mounted() {
    },

    watch: {
      active: function () {
        this.isActive = this.active
      }
    },
    computed: {
    },
    methods: {
      emitClose() {
        this.$emit('close');
      },

      emitConfirm() {
        this.$emit('confirm');
      }
    }
}
