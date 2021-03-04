import axios from "axios";
import TaskList from "../../components/TaskList/TaskList";
import TaskService from "src/services/TaskooTaskService";

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

        async finishTask(data) {
            const taskId = data.id;
            const key = data.key;

            const formData = {
              done: data.state
            }

            this.tasks[key].isDone = formData.done;

            const updated = await TaskService.update(taskId, formData, this)

            if(updated) {
              this.tasks[key].doneAt = updated.doneAt
            }
        },

        async changeTaskName(data) {
            const key = data.key
            const taskId = data.id

            const formData = {
              name: data.newName
            }
            const updated = await TaskService.update(taskId, formData, this)

            if(updated) {
              this.tasks[key]['name'] = formData.name;
            }
        }
    }
}
