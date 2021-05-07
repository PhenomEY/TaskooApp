import TaskooInput from '../TaskooInput/TaskooInput'
import Taskoo404 from '../TaskooNotFound/TaskooNotFound';
import TaskooUserSelect from '../TaskoouserSelect/TaskooUserSelect';
import TaskooDatepicker from "../TaskooDatepicker/TaskooDatepicker";
import TaskList from "../TaskList/TaskList";
import Multiselect from 'vue-multiselect';
import TaskooFileViewer from "src/components/TaskooFileViewer/TaskooFileViewer";

import TaskService from 'src/services/TaskooTaskService';
import FileService from 'src/services/TaskooFileService';

export default {
    name: 'TaskooTaskWindow',
    components: {TaskooInput, Taskoo404, TaskooUserSelect, TaskooDatepicker, TaskList, Multiselect, TaskooFileViewer},
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
            isMobile: this.$store.state.misc.isMobile,
            addingSubTask: false,
            changingPositions: false,
            priorityOptions: [
              {
                "name": this.$t('task.priorities.normal'),
                "value": 0
              },
              {
                "name": this.$t('task.priorities.high'),
                "value": 1
              },
            ],
          taskPriority: null,
          showDeleteDialog: false,
          files: null,
          uploading: false,
          uploadingFile: null
        }
    },

    props: {
    },

    mounted() {
          this.load();
    },

    watch: {
        '$store.state.isMobile': function() {
            this.isMobile = this.$store.state.misc.isMobile
        },

        '$route.params.taskId': function() {
            this.load();
        },
    },

    computed: {
      currentOrganisation: function() {
        return this.$store.state.organisations.currentOrganisation
      },
    },

    methods: {
        async load()
        {
          const taskId = this.$route.params.taskId;

          //reset vars
          this.task = null;
          this.dateDue = null;

          const data = await TaskService.load(taskId, this, true);

          if(data) {
            //Task loaded
            this.task = data.task
            this.assignedUsers = data.task.users
            this.setTitle(this.task.name)
            if(data.task.dateDue) {
              this.dateDue = new Date(this.task.dateDue.date.replace(' ', 'T'))
            }

            this.taskPriority = this.getPriority(this.task.highPriority)

            if(data.task.project.organisation && (data.task.project.organisation !== this.currentOrganisation.id)) {
              this.$store.commit('organisations/setOrganisation', data.task.project.organisation.id);
            }

            this.$nextTick(() => {
              this.fileDragHandler()
            })

          } else {
            //error handling
            this.notFound = true
          }
        },

        async update(data) {
          const taskId = this.$route.params.taskId;

          const updated = await TaskService.update(taskId, data, this);

          if(updated) {
            if ('done' in data) {
              this.task.isDone = !this.task.isDone;
              this.task.doneAt = updated.doneAt;
              this.task.doneBy = updated.doneBy;
            }
          } else {
            //error
          }
        },

        returnTo() {
            if(this.task.mainTask) {
                this.$router.push({ name: `Task`, params: {taskId: this.task.mainTaskId} });
            } else {
                this.$router.push({ name: `Project`, params: {projectId: this.task.project.id} });
            }
        },

        finishTask(value) {
            this.update({
              done: !value
            });
        },

        activateDescriptionSave() {
            this.descriptionSave = true
        },

        addUser(addedUser) {
          const userId = addedUser.id
          this.update({
            addUser: userId
          });
        },

        removeUser(removedUser) {
            const userId = removedUser.id;
            this.update({
              removeUser: userId
            });
        },

        setDate(dateDue) {
            let date = dateDue;

            if(date === null) {
                date = 'null'
            }

            this.update({
              dateDue: date
            });
        },

        async addSubTask() {
            const taskId = this.$route.params.taskId;

            if(this.task.subTasks === null) {
                this.task.subTasks = []
            }

            this.addingSubTask = true

            this.task.subTasks.unshift({
                'id': null,
                'name': this.$t('task.defaultName')
            })

            const formData = {
              mainTaskId: taskId,
              taskName: this.$t('task.defaultName')
            }

            const created = await TaskService.create(formData, this)

            if(created) {
              //success
              this.task.subTasks[0]['id'] = created.createdId;
            } else {
              //error
              this.task.subTasks.shift();
            }

            this.addingSubTask = false
        },

        async changeSubTaskName(data) {
            const name = data.newName;
            const key = data.key
            const taskId = data.id

            const formData = {
              name: name
            }

            const updated = await TaskService.update(taskId, formData, this);

            if(updated) {
              //success
              this.task.subTasks[key]['name'] = name;
            } else {
              //error
            }
        },

        async changedSubPositions(tasks) {
            const taskId = this.$route.params.taskId

            //returns array which only includes the ids of tasks - we dont need more data
            const mapped = tasks.map(x => x.id);

            this.changingPositions = true;

            const formData = {
              subTaskPositions: mapped
            }

            const updated = await TaskService.update(taskId, formData, this);

            this.changingPositions = false;

        },

       async finishSubTask(data) {
            const taskId = data.id;
            const state = data.state;
            const key = data.key;

            const formData = {
              done: state
            }

         this.task.subTasks[key].isDone = state;
            const updated = await TaskService.update(taskId, formData, this);

            if(updated) {
              this.task.subTasks[key].doneAt = updated.doneAt
            } else {
              this.task.subTasks[key].isDone = !state;
            }

        },


      getPriority(id) {
          if(id === true) {
            id = 1;
          } else {
            id = 0;
          }

          return this.priorityOptions.find(element => element.value === id);
      },

      updatePriority(option) {
        this.update({
          priority: option.value
        })
      },

      async deleteTask() {
        const taskId = this.$route.params.taskId;

        const deleted = await TaskService.delete(taskId, this)

        if(deleted) {
          if(this.task.mainTask) {
            this.$router.push({ name: `Task`, params: {taskId: this.task.mainTaskId} });
          } else {
            this.$router.push({ name: `Project`, params: {projectId: this.task.project.id} });
          }
        }
      },


      defaultUpload() {
        this.files = this.$refs['fileinput'].files;

        this.uploadFiles()
      },

      async deleteFile(fileData) {
        const fileId = fileData.id
        const index = fileData.index

        const deleted = await FileService.delete(fileId, this);

        if(deleted) {
          this.task.files.splice(index, 1)
        }
      },

      fileDragHandler() {
        const fileZone = this.$refs['fileZone']

        fileZone.addEventListener('dragover', (e) => {
          e.preventDefault();
          e.stopPropagation();
          fileZone.classList.add('is-dragover');
        })

        fileZone.addEventListener('drop', (e) => {
          e.preventDefault();
          e.stopPropagation();
          fileZone.classList.remove('is-dragover');
          this.files = e.dataTransfer.files;

          this.uploadFiles()
        })
      },


      async uploadFiles() {
        const taskId = this.$route.params.taskId;
        const files = this.files
        let i;
        const fileCount = files.length

        this.uploading = true
        console.log('UPLOADING');
        console.log(files)

        for(i=0; i<fileCount; i++) {
          this.uploadingFile = files[i].name
          let upload = await FileService.upload(files[i], taskId, this)

          if(upload) {
            this.task.files = upload.files;
          }
        }

        this.uploading = false
        this.uploadingFile = null
      },

      toggleDeleteDialog() {
          this.showDeleteDialog = !this.showDeleteDialog
      }
    }
}
