import axios from "axios";
import TaskList from "../../components/TaskList/TaskList";

import TaskService from 'src/services/TaskooTaskService';

export default {
    name: 'MyTasks',
    components: {TaskList},

    data: () => ({
        loadingTasks: true,
        tasks: null,
        doneTasks: false
    }),

    watch: {
        '$store.state.contentRefresh': function() {
            if (this.$store.state.contentRefresh == true) {

                this.$store.commit('toggleRefresh', false);
            }

            return this.$store.state.contentRefresh;
        },

      '$route.name': function() {
          if (this.$route.name === 'DoneTasks') {
            this.doneTasks = true;
            this.getUserTasks();
          } else {
            this.doneTasks = false;
            this.getUserTasks();
          }
      }
    },

    mounted() {
      if(this.$route.name === 'DoneTasks') {
        this.doneTasks = true;
      }
        this.setTitle(this.$t('tasks.title'));
        this.getUserTasks()
    },

    computed: {
    },

    methods: {
        getUserTasks() {
            this.loadingTasks = true

            axios
                .get(axios.defaults.baseURL+'/user/tasks', {params: {
                        done: this.doneTasks
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

        async finishTask(data) {
            const taskId = data.id;
            const state = data.state;
            const key = data.key;

            this.tasks[key].isDone = state;

            const formData = {
            done: state
            }

            const updated = await TaskService.update(taskId, formData, this)

            if(updated) {
              //success
              this.tasks[key].doneAt = updated.doneAt
            } else {
              //error
            }
        },

        async changeTaskName(data) {
            const name = data.newName;
            const key = data.key
            const taskId = data.id

            const formData = {
              name: name
            }
            const updated = await TaskService.update(taskId, formData, this)

            if(updated) {
              this.tasks[key]['name'] = name;
            }
        },

        showDoneTasks() {
          if(this.$route.name === 'DoneTasks') {
            this.$router.push({
              name: 'Tasks'
            })

            return
          }

          this.$router.push({
            name: 'DoneTasks'
          })

        }
    }
}
