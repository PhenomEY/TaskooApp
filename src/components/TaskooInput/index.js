import axios from "axios";

export default {
    name: 'TaskooInput',
    components: {},

    data() {
        return {
          inputModel: this.model
        }
    },

    props: {
        model: {
            required: true
        },

        label: String,
        placeholder: String,
        required: Boolean,
        type: String
    },

    watch: {
    },


    mounted() {
    },

    computed: {
    },

    methods: {
        modelChange() {
            this.$emit('modelChanged', this.inputModel)
        }
    }
}