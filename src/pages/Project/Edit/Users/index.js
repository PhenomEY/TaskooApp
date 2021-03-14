import axios from "axios";
import TaskooUserSelect from 'src/components/TaskoouserSelect/TaskooUserSelect';

export default {
    name: 'EditProjectUsers',
    components: {TaskooUserSelect},

    data: () => ({
    }),


    mounted() {
      console.log('project users')
    },

    computed: {
      projectId() {
        return this.$route.params.projectId
      }
    },

    methods: {
    }
}
