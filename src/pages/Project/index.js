import draggable from 'vuedraggable'
import TaskGroup from '../../components/TaskGroup/TaskGroup';
import Taskoo404 from '../../components/TaskooNotFound/TaskooNotFound';
import Skeleton from 'vue-loading-skeleton';
import axios from "axios";


export default {
    name: 'Project',
    components: {TaskGroup, draggable, Taskoo404, Skeleton},

    data: () => ({
        loading: true,
        notFound: false,
        groups: null,
        addingGroup: false,
        addingTask: false,
        project: {
            name: null,
            deadline: null
        },
        isMobile: false
    }),

    watch: {
        '$store.state.contentRefresh': function() {
            if (this.$store.state.contentRefresh == true) {
                this.loading = true;
                this.getProjectData(true)
            }

            return this.$store.state.contentRefresh;
        },

        '$store.state.isMobile': function() {
          this.isMobile = this.$store.state.isMobile
            if(this.isMobile === false) {
                const transitionGroup = document.querySelector('.task-groups .transition-group');
                transitionGroup.style.transform = 'translateX(0)'
            }
        },

        '$route.params.projectId': function() {
            this.groups = null
            this.project = {
                name: null,
                deadline: null
            }
            this.notFound = false
            this.loading = true
            this.getProjectData()
        }
    },

    mounted() {
        this.getProjectData()

        this.isMobile = this.$store.state.isMobile
    },

    computed: {
        dragOptions() {
            return {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "ghost"
            };
        },
    },

    methods: {
        getProjectData(toggle) {
            const projectId = this.$route.params.projectId

            axios
                .get(axios.defaults.baseURL+'/project/'+projectId)
                .catch(error => {
                    this.loading = false;
                    this.notFound = true;
                })
                .then(response => {
                    if(!response) {
                        return
                    }

                    if(response.data.success == true) {
                        this.project.name = response.data.project.name;
                        this.setTitle(this.project.name);
                        this.project.deadline = response.data.project.deadline;
                        this.groups = response.data.groups;
                        this.loading = false;
                    } else {
                        this.loading = false;
                        this.notFound = true;
                    }

                    if(toggle === true) {
                        this.$store.commit('toggleRefresh', false);
                    }
                })
        },

        changedGroupPositions(model) {

            const groups = model;
            //returns array which only includes the ids of taskgroups - we dont need more data
            const mapped = groups.map(x => x.id);
            const projectId = this.$route.params.projectId

            axios
                .put(axios.defaults.baseURL+'/project/'+projectId, {
                    groupPositions: mapped
                })
                .then(response => {
                    if(response.data.success == true) {

                    } else {

                    }

                })

        },

        changeTaskPositions(data) {
                const tasks = data.tasks;
                const groupId = data.groupId;
                const projectId = this.$route.params.projectId;

                //returns array which only includes the ids of tasks - we dont need more data
                const mapped = tasks.map(x => x.id);

            axios
                .put(axios.defaults.baseURL+'/taskgroup/'+groupId, {
                    projectId: projectId,
                    groupId: groupId,
                    taskPositions: mapped
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

        addNewGroup() {
            this.addingGroup = true
            this.groups.push({
                'id': null,
                'name': 'Neue Gruppe',
                'tasks': []
            })

            const addedGroup = this.groups[this.groups.length-1];
            const position = this.groups.length-1;
            const projectId = this.$route.params.projectId;

            axios
                .post(axios.defaults.baseURL+'/taskgroup', {
                    projectId: projectId,
                    name: addedGroup.name,
                    position: position
                })
                .catch(function (error) {
                })
                .then(response => {
                    if(response.data.success == true) {
                        this.groups[position]['id'] = response.data.createdId;
                        this.$vToastify.success("Group created");
                        this.addingGroup = false
                    } else {
                        this.addingGroup = false
                        this.groups.pop();
                        this.$vToastify.error("Group not created");
                    }

                })


        },

        changeGroupName(data) {
            const id = data.id;
            const name = data.newName;
            const key = data.key;

            axios
                .put(axios.defaults.baseURL+'/taskgroup/'+id, {
                    name: name
                })
                .then(response => {
                    if(response.data.success == true) {
                        this.$vToastify.success("name changed");
                        this.groups[key]['name'] = name
                    } else {
                        this.$vToastify.error("name changed failed");
                    }
                })
        },

        addTask(data) {
            this.addingTask = true

            const projectId = this.$route.params.projectId;
            const groupId = data.id;
            const groupKey = data.key;


            if(this.groups[groupKey]['tasks'] === null) {
                this.groups[groupKey]['tasks'] = []
            }

            this.groups[groupKey]['tasks'].unshift({
                'dateDue': null,
                'id': null,
                'name': this.$t('task.defaultName'),
                'user': null
            })

            const addedTask = this.groups[groupKey]['tasks'][0];

            axios
                .post(axios.defaults.baseURL+'/task', {
                    projectId: projectId,
                    groupId: groupId,
                    taskName: addedTask.name
                })
                .catch(function (error) {
                    this.groups[groupKey]['tasks'].shift();
                    this.addingTask = false
                })
                .then(response => {
                    if(!response) {
                        return
                    }

                    if(response.data.success === true) {
                        this.groups[groupKey]['tasks'][0]['id'] = response.data.createdId;
                        this.$vToastify.success("Task created");
                        this.addingTask = false
                    } else {
                        this.groups[groupKey]['tasks'].shift();
                        this.$vToastify.error("Task creation failed");
                        this.addingTask = false
                    }
                })
        },


        changeTaskName(data) {
            const groupKey = data.groupKey;
            const taskKey = data.taskKey;
            const taskId = data.id;
            const name = data.newName;
            const projectId = this.$route.params.projectId;

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
                        this.groups[groupKey]['tasks'][taskKey]['name'] = name;
                    } else {
                        this.$vToastify.error("task name changed failed");
                    }
                })

        },

        finishTask(data) {
            const groupKey = data.groupKey;
            const key = data.taskKey;
            const taskId = data.taskId;
            const state = data.state;
            const projectId = this.$route.params.projectId;

            //set task done
            this.groups[groupKey]['tasks'][key]['isDone'] = !state;

            axios
                .put(axios.defaults.baseURL+'/task/'+taskId, {
                    projectId: projectId,
                    done: !state
                })
                .catch(function (error) {
                })
                .then(response => {
                    if(response.data.success === true) {
                        setTimeout(() => {
                            this.groups[groupKey]['tasks'].splice(key, 1);
                        }, 300)

                    } else {
                    }
                })
        },

        getDoneTasks(data) {
            const groupKey = data.groupKey;
            const groupId = data.groupId;

            this.groups[groupKey]['tasksLoading'] = true;
            this.groups[groupKey]['showDoneTasks'] = true;

            axios
                .get(axios.defaults.baseURL+'/taskgroup/'+groupId, {
                    params: {
                        done: true
                    }
                })
                .catch(function (error) {
                })
                .then(response => {
                    if(response.data.success === true) {
                        this.groups[groupKey]['showDoneTasks'] = true;
                        this.groups[groupKey]['tasks'] = response.data.tasks;
                        this.groups[groupKey]['tasksLoading'] = false;
                    } else {
                    }
                })
        },

        getOpenTasks(data) {
            const groupKey = data.groupKey;
            const groupId = data.groupId;

            this.groups[groupKey]['tasksLoading'] = true;
            this.groups[groupKey]['showDoneTasks'] = false;

            axios
                .get(axios.defaults.baseURL+'/taskgroup/'+groupId, {
                    params: {
                        done: false
                    }
                })
                .catch(function (error) {
                })
                .then(response => {
                    if(response.data.success === true) {
                        this.groups[groupKey]['showDoneTasks'] = false;
                        this.groups[groupKey]['tasks'] = response.data.tasks;
                        this.groups[groupKey]['tasksLoading'] = false;
                    } else {
                    }
                })
        },

        deleteGroup(data) {
            const groupId = data.groupId;
            const groupKey = data.groupKey;

            axios
                .delete(axios.defaults.baseURL+'/taskgroup/'+groupId)
                .catch(function (error) {
                })
                .then(response => {
                    if(response.data.success === true) {
                        this.groups.splice(groupKey, 1)
                    } else {
                    }
                })
        },


        swipeHandler (direction) {
            const transitionGroup = document.querySelector('.task-groups .transition-group');
            const maxWidth = transitionGroup.offsetWidth
            const taskGroup = document.querySelector('[data-groupKey="0"]')
            const groupWidth = taskGroup.offsetWidth
            const currentTransform = window.getComputedStyle(transitionGroup).transform
            const matrix = new WebKitCSSMatrix(currentTransform)
            const currentX = matrix.m41;


            if(!this.$store.state.isMobile) { return }

           if(direction === 'left' && currentX !== -(maxWidth -groupWidth)) {
               transitionGroup.style.transform = 'translateX('+(currentX-groupWidth)+'px)'
           }

            if(direction === 'right' && currentX < 0) {
                transitionGroup.style.transform = 'translateX('+(currentX+groupWidth)+'px)'
            }
        }
    }
}
