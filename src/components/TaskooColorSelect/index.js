import Multiselect from 'vue-multiselect'
import axios from "axios"



export default {
    name: 'TaskooColorSelect',
    components: {Multiselect},
    data() {
        return {
            data:this.model,
        }
    },

    props: {
        model: [Object],
        colors: [Array]
    },

    mounted() {
    },

    watch: {

    },
    computed: {
    },
    methods: {
      selectedColor(color) {
        this.$emit('selectedColor', color)
      }
    }
}
