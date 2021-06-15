export default {
    name: 'TaskooBoxedNavEntry',
    components: {},
    data() {
        return {
          isActive: false
        }
    },

    props: {
      name: String,
      toName: String,
      hasSubs: Boolean,
      disabled: {
        required: false
      }
    },

    mounted() {
      this.setActiveFlag()
    },

    watch: {
      '$route': function () {
        this.setActiveFlag()
      }
    },
    computed: {
    },

    methods: {
      setActiveFlag() {
        if(!this.hasSubs) return

        console.log(this.$route.matched)
        console.log(this.toName)

        const routes = this.$route.matched;
        const matches = routes.find(e => e.name === this.toName);

        if(typeof matches !== 'undefined') {
          this.isActive = true;
        } else {
          this.isActive = false;
        }

      },

      handleClick(e) {
        if(disabled) {
          e.preventDefault
        }
      }
    }
}
