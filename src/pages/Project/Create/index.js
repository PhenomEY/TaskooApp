import axios from "axios";
import TaskooInput from "../../../components/TaskooInput/TaskooInput"
import TaskooDatepicker from "../../../components/TaskooDatepicker/TaskooDatepicker"
import TaskooUserSelect from '../../../components/TaskoouserSelect/TaskooUserSelect';

export default {
    name: 'CreateProject',
    components: {TaskooInput, TaskooDatepicker, TaskooUserSelect},

    data: () => ({
        projectName: null,
        deadline: null,
        projectUsers: []

    }),


    mounted() {
    },

    computed: {
    },

    methods: {
        setProjectName(val) {
            this.projectName = val
            console.log(this.projectName)
        },

        setDeadline(val) {
            console.log('set deadline')
            this.deadline = val
            console.log(this.deadline.toISOString())
            console.log(this.deadline)
        },

        createProject() {
            const projectName = this.projectName;
            const deadline = this.deadline

            axios
                .post(axios.defaults.baseURL+'/project', {
                    projectName: projectName,
                    deadline: deadline,
                    groupName: 'Neue Gruppe'
                })
                .catch(function (error) {
                })
                .then(response => {
                    if(response.data.success == true) {
                        this.$vToastify.success("Project created");
                        this.$router.push({
                            path: '/project/'+response.data.projectId
                        })
                    }
                })
        }
    }
}
