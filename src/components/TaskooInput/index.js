import TaskooHelpIcon from "src/components/TaskooHelpIcon/TaskooHelpIcon"

export default {
    name: 'TaskooInput',
    components: {TaskooHelpIcon},

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
        type: String,
        helpText: String,
        infoText: String
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
