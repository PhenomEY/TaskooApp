export default {
    name: 'TaskooIconButton',
    components: {
    },

    props: ['disabled'],

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
