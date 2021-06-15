export default {
    name: 'TaskooHelpIcon',
    components: {
    },

    props: ['helpText'],

    data() {
      return {
      }
    },

    watch: {
    },

    mounted() {
    },

    computed: {
    },

    methods: {
      clicked() {
        if(this.disabled) return;
        this.$emit('click')
      }
    }
}
