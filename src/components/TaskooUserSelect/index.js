import Multiselect from 'vue-multiselect'




export default {
    name: 'TaskooUserSelect',
    components: {Multiselect},
    data() {
        return {
            data:this.model
        }
    },

    props: {
        model: [Array, Object],
        options: [Array],
        multi: Boolean,
        disabled: {
            type: Boolean,
            default: false
        }
    },

    mounted() {
    },

    watch: {

    },
    computed: {
      API_URL: function () {
        return window.API_URL
      },
    },
    methods: {
        removeUser(removedUser, id) {
            this.$emit('removedUser', removedUser)
        },

        addUser(addedUser, id) {
            this.$emit('addedUser', addedUser)
        },

      firstAndLastname ({ firstname, lastname }) {
        return `${firstname} ${lastname}`
      }
    }
}
