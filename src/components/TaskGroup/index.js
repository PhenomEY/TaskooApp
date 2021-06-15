import draggable from 'vuedraggable'
import TextareaEditable from "../TextareaEditable/TextareaEditable";
import InputfieldEditable from "../InputfieldEditable/InputfieldEditable";
import TaskooIconButton from "src/components/TaskooIconButton/TaskooIconButton"
import TaskooAvatar from "src/components/TaskooAvatar/TaskooAvatar"

export default {
    name: 'TaskGroup',
    components: {draggable, TextareaEditable, InputfieldEditable, TaskooIconButton, TaskooAvatar},

    data() {
        return {
            tasks: this.model,
            disabled: false,
            isLoadingTasks: false

        }
    },

    mounted() {
    },

    props: {
        model: Array,
        group: String,
        groupId: Number,
        groupKey: Number,
        groupName: String,
        addingGroup: Boolean,
        addingTask: Boolean,
        openTasks: Boolean,
        tasksLoading: Boolean,
        showDoneTasks: Boolean,
        isMobile: Boolean
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

      API_URL: function () {
        return window.API_URL
      },
    },

    watch: {
        tasksLoading: function(value) {
            this.isLoadingTasks = value;
        }
    },


    methods: {
        changedTaskPositions(model, groupId, dragged) {
        const data = {
            'tasks': model,
            'groupId': groupId
        }

        this.$emit('changeTaskPositions', data)
        },

        addTask(groupId, groupKey) {
            const data = {
                'id': groupId,
                'key': groupKey
            }
            if(this.addingTask || this.showDoneTasks) {
                return;
            }

            this.$emit('addTask', data)
        },

        addGroup() {
            if(!this.addingGroup) {
                this.$emit('addGroup', true)
            }
        },

        removeGroup(id, key, name) {
            const data = {
                'groupId': id,
                'groupKey': key,
                'name': name
            }
            this.$emit('deleteGroup', data)
        },

        changeGroupName(groupKey, id, newName) {
            const data  = {
                'id': id,
                'newName': newName,
                'key': groupKey
            }
            this.$emit('changedGroupName', data)
        },

        changeTaskName(gKey, tKey, id, value) {
            const data = {
                'groupKey': gKey,
                'taskKey': tKey,
                'id': id,
                'newName': value
            }
            this.disabled = false
            this.$emit('changeTaskName', data)
        },

        toggleDragging(val) {
            this.disabled = val;
        },

        goToTask(id) {
            const taskId = id;
            this.$router.push({ name: `Task`, params: {taskId: taskId} });
        },

        taskDone(id, key, gKey, state) {
            const data = {
                'taskId': id,
                'taskKey': key,
                'groupKey': gKey,
                'state': state
            }

            this.$emit('finishTask', data);
        },

        getDoneTasks(key,id) {
            const data = {
                'groupKey': key,
                'groupId': id
            }

            if(this.showDoneTasks === true) {
                this.$emit('getOpenTasks', data);
                return;
            }

            this.$emit('getDoneTasks', data);
        }
    }
}
