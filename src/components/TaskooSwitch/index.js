export default {
    name: 'TaskooSwitch',

    props: {
      value: {
        type: Boolean
      },
      label: {
        type: String
      },
      disabled: {
      }
    },

    data() {
      return {
        content: this.value
      }
    },

    watch: {
      value: function () {
        this.content = this.value
      }
    },

    computed: {
    },

    methods: {
      handleChange () {
        this.$emit('input', this.content)
      }
    }
}
