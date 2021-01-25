import TaskooInput from '../TaskooInput/TaskooInput'
import Taskoo404 from '../TaskooNotFound/TaskooNotFound';
import TaskooUserSelect from '../TaskoouserSelect/TaskooUserSelect';
import TaskooDatepicker from "../TaskooDatepicker/TaskooDatepicker";
import TaskList from "../TaskList/TaskList";
import axios from "axios";



export default {
    name: 'TaskooTaskWindow',
    components: {TaskooInput, Taskoo404, TaskooUserSelect, TaskooDatepicker, TaskList},
    data() {
        return {
            task: null,
            notFound: false,
            taskToolbar: [
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }]
            ],
            descriptionSave: false,
            descriptionisFocused: false,
            availableUsers: null,
            dateDue: null,
            assignedUsers: [],
            isMobile: this.$store.state.isMobile,
            addingSubTask: false,
            changingPositions: false
        }
    },

    props: {
    },

    mounted() {
          this.getTask();
    },

    watch: {
        '$store.state.isMobile': function() {
            this.isMobile = this.$store.state.isMobile
        },

        '$route.params.taskId': function() {
            this.task = null;
            this.getTask()
        },
    },

    computed: {
    },

    methods: {
        returnTo() {
            if(this.task.mainTask) {
                this.$router.push({ name: `Task`, params: {taskId: this.task.mainTaskId} });
            } else {
                this.$router.push({ name: `Project`, params: {projectId: this.task.projectId} });
            }


        },

        getTask() {
            const taskId = this.$route.params.taskId;

            //reset vars
            this.task = null;
            this.dateDue = null;

            axios
                .get(axios.defaults.baseURL+'/task/'+taskId, {params: {
                    subTasks: true
                    }
                })
                .catch(error => {
                    this.notFound = true
                })
                .then(response => {
                    if(!response) {
                        this.notFound = true
                        return
                    }

                    if(response.data.success == true) {
                        this.task = response.data.task
                        this.assignedUsers = response.data.task.users
                        this.setTitle(this.task.name)
                        if(response.data.task.dateDue) {
                            this.dateDue = new Date(this.task.dateDue.date)
                        }
                    } else {
                        this.notFound = true
                    }

                })
        },

        finishTask(id, value) {
            const taskId = id;
            const state = value;
            const projectId = this.$route.params.projectId;

            axios
                .put(axios.defaults.baseURL+'/task/'+taskId, {
                    projectId: projectId,
                    done: !state
                })
                .catch(function (error) {
                })
                .then(response => {
                    if(response.data.success === true) {
                        this.task.isDone = !state;
                        this.task.doneAt = response.data.doneAt;
                        this.task.doneBy = response.data.doneBy;
                    } else {
                    }
                })
        },

        activateDescriptionSave() {
            this.descriptionSave = true
        },

        saveDescription(id) {
            const description = this.task.description;
            const taskId = id;
            const projectId = this.$route.params.projectId;

            axios
                .put(axios.defaults.baseURL+'/task/'+taskId, {
                    projectId: projectId,
                    description: description
                })
                .catch(function (error) {
                })
                .then(response => {
                    if(response.data.success === true) {
                        this.$vToastify.success("description saved");
                    } else {
                    }
                })
        },

        addUser(addedUser) {
            const userId = addedUser.id;
            const projectId = this.$route.params.projectId;
            const taskId = this.$route.params.taskId;

            axios
                .put(axios.defaults.baseURL+'/task/'+taskId, {
                    projectId: projectId,
                    addUser: userId
                })
                .catch(function (error) {
                })
                .then(response => {
                    if(response.data.success === true) {
                        this.$vToastify.success("user added");
                    } else {
                    }
                })
        },

        removeUser(removedOption) {
            const userId = removedOption.id;
            const projectId = this.$route.params.projectId;
            const taskId = this.$route.params.taskId;

            axios
                .put(axios.defaults.baseURL+'/task/'+taskId, {
                    projectId: projectId,
                    removeUser: userId
                })
                .catch(function (error) {
                })
                .then(response => {
                    if(response.data.success === true) {
                        this.$vToastify.success("user removed");
                    } else {
                    }
                })
        },

        setDate(dateDue) {
            let date = dateDue;
            const projectId = this.$route.params.projectId;
            const taskId = this.$route.params.taskId;

            if(date === null) {
                date = 'null'
            }

            axios
                .put(axios.defaults.baseURL+'/task/'+taskId, {
                    projectId: projectId,
                    dateDue: date
                })
                .catch(function (error) {
                })
                .then(response => {
                    if(response.data.success === true) {
                        this.$vToastify.success("date changed");
                    } else {
                    }
                })
        },

        addSubTask() {
            const taskId = this.$route.params.taskId;
            const projectId = this.$route.params.projectId;

            if(this.task.subTasks === null) {
                this.task.subTasks = []
            }

            this.addingSubTask = true

            this.task.subTasks.unshift({
                'id': null,
                'name': this.$t('task.defaultName')
            })

            axios
                .post(axios.defaults.baseURL+'/task', {
                    mainTaskId: taskId,
                    projectId: projectId,
                    taskName: this.$t('task.defaultName')
                })
                .catch(function (error) {
                    this.task.subTasks.shift();
                    this.addingSubTask = false
                })
                .then(response => {
                    if(!response) {
                        return
                    }

                    if(response.data.success === true) {
                        this.task.subTasks[0]['id'] = response.data.createdId;
                        this.$vToastify.success("Task created");
                        this.addingSubTask = false
                    }
                })
        },

        changeSubTaskName(data) {
            const name = data.newName;
            const key = data.key
            const projectId = this.$route.params.projectId;
            const taskId = data.id
            axios
                .put(axios.defaults.baseURL+'/task/'+taskId, {
                    projectId: projectId,
                    name: name
                })
                .catch(function (error) {
                })
                .then(response => {
                    if(response.data.success === true) {
                        this.$vToastify.success("task name changed");
                        this.task.subTasks[key]['name'] = name;
                    } else {
                        this.$vToastify.error("task name changed failed");
                    }
                })
        },

        changedSubPositions(tasks) {
            const projectId = this.$route.params.projectId;
            const taskId = this.$route.params.taskId

            //returns array which only includes the ids of tasks - we dont need more data
            const mapped = tasks.map(x => x.id);

            this.changingPositions = true;
            axios
                .put(axios.defaults.baseURL+'/task/'+taskId, {
                    projectId: projectId,
                    subTaskPositions: mapped
                })
                .catch(function (error) {
                    this.changingPositions = false;
                })
                .then(response => {
                    if(!response) {
                        return
                    }
                    if(response.data.success == true) {
                        this.changingPositions = false;
                    } else {
                    }

                })
        },

        finishSubTask(data) {
            const taskId = data.id;
            const state = data.state;
            const key = data.key;
            const projectId = this.$route.params.projectId;

            this.task.subTasks[key].isDone = state;

            axios
                .put(axios.defaults.baseURL+'/task/'+taskId, {
                    projectId: projectId,
                    done: state
                })
                .catch(function (error) {
                })
                .then(response => {
                    if(response.data.success === true) {
                        this.task.subTasks[key].doneAt = response.data.doneAt
                    } else {
                    }
                })
        },

        updateTaskName(name) {
            const newName = name;
            const taskId = this.$route.params.taskId;
            const projectId = this.$route.params.projectId;

            axios
                .put(axios.defaults.baseURL+'/task/'+taskId, {
                    projectId: projectId,
                    name: newName
                })
                .catch(function (error) {
                })
                .then(response => {
                    if(!response) {
                        return
                    }
                    if(response.data.success == true) {
                    } else {
                    }

                })
        },
    }
}
