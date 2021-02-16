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

        error: Boolean,
        label: String,
        placeholder: String,
        required: Boolean,
        type: String
    },

    watch: {
      model: function() {
        this.inputModel = this.model
      }
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
