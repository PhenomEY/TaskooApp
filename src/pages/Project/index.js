import draggable from 'vuedraggable'
import TaskGroup from '../../components/TaskGroup/TaskGroup';
import Taskoo404 from '../../components/TaskooNotFound/TaskooNotFound';
import Skeleton from 'vue-loading-skeleton';

import TaskService from "src/services/TaskooTaskService";
import ProjectService from "src/services/TaskooProjectService";
import TaskGroupService from "src/services/TaskooTaskGroupService";


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
        },
        isMobile: false,
        showDeleteDialog: false,
        deleteData: {
          name: null
        }
    }),

    watch: {
        '$store.state.misc.contentRefresh': function() {
            if (this.$store.state.misc.contentRefresh == true) {
                this.loadProject(true)
            }

            return this.$store.state.misc.contentRefresh;
        },

        '$store.state.misc.isMobile': function() {
          this.isMobile = this.$store.state.misc.isMobile
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
            this.loadProject()
        }
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

      userType: function() {
        return this.$store.state.user.user.role
      },


      currentOrganisation: function() {
        return this.$store.state.organisations.currentOrganisation
      },

      availableOrganisations() {
        return this.$store.state.organisations.availableOrganisations
      },
    },

    mounted() {
      this.loadProject()
      this.isMobile = this.$store.state.misc.isMobile
    },

    methods: {
        async loadProject(toggle) {
            const projectId = this.$route.params.projectId
            this.loading = true

            const loaded = await ProjectService.load(projectId, this);

            if(loaded) {
              this.project = loaded.project;
              this.setTitle(this.project.name);
              this.groups = loaded.groups;

              if(loaded.project.organisation && (loaded.project.organisation !== this.currentOrganisation.id) && this.availableOrganisations) {
                this.$store.commit('organisations/setOrganisation', loaded.project.organisation.id);
              }
              this.loading = false;

            } else {
              this.loading = false;
              this.notFound = true;
            }

          if(toggle === true) {
            this.$store.commit('toggleRefresh', false);
          }
        },

        async changedGroupPositions(model) {
            const groups = model;

            //returns array which only includes the ids of taskgroups - we dont need more data
            const mapped = groups.map(x => x.id);
            const projectId = this.$route.params.projectId

            const formData = {
              groupPositions: mapped
            }
            const updated = await ProjectService.update(projectId, formData, this, true);
        },

        async changeTaskPositions(data) {
                const tasks = data.tasks;
                const groupId = data.groupId;

                //returns array which only includes the ids of tasks - we dont need more data
                const mapped = tasks.map(x => x.id);

                const formData = {
                  groupId: groupId,
                  taskPositions: mapped
                }

                const updated = await TaskGroupService.update(groupId, formData, this);
        },

        async addNewGroup() {
            const projectId = this.$route.params.projectId;
            this.addingGroup = true
            this.groups.push({
                'id': null,
                'name': this.$t('taskGroup.defaultName'),
                'tasks': []
            })

            const addedGroup = this.groups[this.groups.length-1];
            const position = this.groups.length-1;

            const formData = {
              name: addedGroup.name,
              position: position,
              projectId: projectId
            }

            const created = await TaskGroupService.create(formData, this)

            if(created) {
              this.groups[position]['id'] = created.createdId;
            } else {
              this.groups.pop();
            }
            this.addingGroup = false
        },

        async changeGroupName(data) {
            const groupId = data.id;
            const key = data.key;

            const formData = {
              name: data.newName
            }

            const updated = await TaskGroupService.update(groupId, formData, this);

            if(updated) {
              this.groups[key]['name'] = formData.name
            }
        },

      async addTask(data) {
            this.addingTask = true

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

            const formData = {
              groupId: groupId,
              taskName: addedTask.name
            }

            const created = await TaskService.create(formData, this);

            if(created) {
              //success
              this.groups[groupKey]['tasks'][0]['id'] = created.createdId;
              this.addingTask = false
            } else {
              //error
              this.groups[groupKey]['tasks'].shift();
              this.addingTask = false
            }
        },


        async changeTaskName(data) {
            const groupKey = data.groupKey;
            const taskKey = data.taskKey;
            const taskId = data.id;
            const name = data.newName;

            const formData = {
              name: name
            }

            const updated = await TaskService.update(taskId, formData, this);

            if(updated) {
              this.groups[groupKey]['tasks'][taskKey]['name'] = name;
            }
        },

        async finishTask(data) {
            const groupKey = data.groupKey;
            const key = data.taskKey;
            const taskId = data.taskId;
            const state = data.state;

            //set task done
            this.groups[groupKey]['tasks'][key]['isDone'] = !state;

            const formData = {
              done: !state
            }

            const updated = await TaskService.update(taskId, formData, this);

            if(updated) {
              setTimeout(() => {
                this.groups[groupKey]['tasks'].splice(key, 1);
              }, 300)
            }
        },

        async getDoneTasks(data) {
            const groupKey = data.groupKey;
            const groupId = data.groupId;

            this.groups[groupKey]['tasksLoading'] = true;
            this.groups[groupKey]['showDoneTasks'] = true;

            const loaded = await TaskGroupService.load(groupId, true, this);

            if(loaded) {
              this.groups[groupKey]['showDoneTasks'] = true;
              this.groups[groupKey]['tasks'] = loaded.tasks;
              this.groups[groupKey]['tasksLoading'] = false;
            }
        },

        async getOpenTasks(data) {
            const groupKey = data.groupKey;
            const groupId = data.groupId;

            this.groups[groupKey]['tasksLoading'] = true;
            this.groups[groupKey]['showDoneTasks'] = false;

          const loaded = await TaskGroupService.load(groupId, false, this);

          if(loaded) {
            this.groups[groupKey]['showDoneTasks'] = false;
            this.groups[groupKey]['tasks'] = loaded.tasks;
            this.groups[groupKey]['tasksLoading'] = false;
          }
        },

        async deleteGroup() {
            const groupId = this.deleteData.groupId;
            const groupKey = this.deleteData.groupKey;

            const deleted = await TaskGroupService.delete(groupId, this)
            if(deleted) {
              this.groups.splice(groupKey, 1)

              this.deleteData = {
                name: null
              }
            }
        },


        swipeHandler (direction) {
            //JannySlider
            const transitionGroup = document.querySelector('.task-groups .transition-group');
            const maxWidth = transitionGroup.offsetWidth
            const taskGroup = document.querySelector('[data-groupKey="0"]')
            const groupWidth = taskGroup.offsetWidth
            const currentTransform = window.getComputedStyle(transitionGroup).transform
            const matrix = new WebKitCSSMatrix(currentTransform)
            const currentX = matrix.m41;


            if(!this.$store.state.misc.isMobile) { return }

          const scrollPosition = window.pageYOffset;

           if(direction === 'left' && currentX !== -(maxWidth -groupWidth)) {
               transitionGroup.style.transform = 'translateX('+(currentX-groupWidth)+'px)'
           }

            if(direction === 'right' && currentX < 0) {
                transitionGroup.style.transform = 'translateX('+(currentX+groupWidth)+'px)'
            }
        },

      toggleDeleteDialog(data) {
          if(!data) {
            this.deleteData = {
              name: null
            }

            this.showDeleteDialog = false
            return;
          }

          this.deleteData = data
          this.showDeleteDialog = !this.showDeleteDialog;

      },

      consoleLog() {
          console.log('SAVED')
      }
    }
}
