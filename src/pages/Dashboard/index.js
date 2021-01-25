import axios from "axios";
import TaskList from "../../components/TaskList/TaskList";

export default {
    name: 'Dashboard',
    components: {TaskList},

    data: () => ({
        currentTime: new Date(),
        loadingNotifications: true,
        notifications: null,
        loadingTasks: true,
        tasks: null
    }),

    mounted() {
        this.getNotifications()
        this.getUserTasks()

        this.getCurrentTime()
        this.setTitle(this.$t('dashboard.title'));
    },
    methods: {

        getNotifications() {
            this.loadingNotifications = true

            axios
                .get(axios.defaults.baseURL+'/user/notifications', {params: {
                        dashboard: true
                    }
                })
                .catch(error => {
                    this.notFound = true
                })
                .then(response => {
                    if(!response) {
                        this.loadingNotifications = false
                        return
                    }

                    if(response.data.success == true) {
                        this.notifications = response.data.notifications
                        this.loadingNotifications = false
                    }

                })
        },

        getUserTasks() {
            this.loadingTasks = true

            axios
                .get(axios.defaults.baseURL+'/user/tasks', {params: {
                        dashboard: true
                    }
                })
                .catch(error => {
                    this.notFound = true
                })
                .then(response => {
                    if(!response) {
                        this.loadingTasks = false
                        return
                    }

                    if(response.data.success == true) {
                        this.loadingTasks = false
                        this.tasks = response.data.tasks
                    }

                })
        },

        getCurrentTime() {
            this.currentTime = new Date();

            if(this.$route.name !== 'Dashboard') {
                return;
            }


            setTimeout(() => (
                this.getCurrentTime()
            ), 1000);
        },

        goToTask(id) {
            const taskId = id;
            this.$router.push({ name: `Task`, params: {taskId: taskId} });
        },

        goToProject(id) {
            const projectId = id;
            this.$router.push({ name: `Project`, params: {projectId: projectId} });
        },

        finishTask(data) {
            const taskId = data.id;
            const state = data.state;
            const key = data.key;

            this.tasks[key].isDone = state;

            axios
                .put(axios.defaults.baseURL+'/task/'+taskId, {
                    done: state
                })
                .catch(function (error) {
                })
                .then(response => {
                    if(response.data.success === true) {
                        this.tasks[key].doneAt = response.data.doneAt
                    } else {
                    }
                })
        },

        changeTaskName(data) {
            const name = data.newName;
            const key = data.key
            const taskId = data.id
            axios
                .put(axios.defaults.baseURL+'/task/'+taskId, {
                    name: name
                })
                .catch(function (error) {
                })
                .then(response => {
                    if(response.data.success === true) {
                        this.$vToastify.success("task name changed");
                        this.tasks[key]['name'] = name;
                    } else {
                        this.$vToastify.error("task name changed failed");
                    }
                })
        }
    }
}
