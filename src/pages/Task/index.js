import TaskooTaskWindow from '../../components/TaskooTaskWindow/TaskooTaskWindow'

import axios from "axios";


export default {
    name: 'Task',
    components: {TaskooTaskWindow},

    data() {
        return {
            fadeOut:false,
            taskId: this.$route.params.taskId,
            projectId: this.$route.params.projectId
        }
    },


    watch: {
    },

    mounted() {

    },

    computed: {
    },

    methods: {
    }
}
