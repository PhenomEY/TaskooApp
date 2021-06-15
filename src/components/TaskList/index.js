import axios from "axios";
import draggable from 'vuedraggable'
import InputfieldEditable from "../InputfieldEditable/InputfieldEditable";
import TaskooIconButton from "src/components/TaskooIconButton/TaskooIconButton";

export default {
    name: 'TaskList',
    components: {InputfieldEditable, draggable, TaskooIconButton},

    data() {
        return {
            isMobile: this.$store.state.isMobile,
            disabled: false
        }
    },

    props: {
        tasks: Array,
        type: String,
        addingTask: Boolean,
        changingPositions: Boolean,
        title: String,
        noDragging: Boolean,
        addButton: Boolean,
    },

    watch: {
        '$store.state.isMobile': function() {
            this.isMobile = this.$store.state.isMobile
        },
    },


    mounted() {
    },

    computed: {
        dragOptions() {
            return {
                animation: 200,
                group: "subtasks",
                disabled: false,
                ghostClass: "ghost"
            };
        }
    },

    methods: {
        addSubTask() {
            if(!this.addingTask) {
                this.$emit('addSubTask', true);
            }
        },

        positionsChanged(tasks) {
            this.$emit('positionsChanged', tasks);
        },

        changeTaskName(key, id, newName) {
            const data = {
                key: key,
                id: id,
                newName: newName
            }
            this.$emit('changedTaskName', data);
        },

        finishTask(key, id, state) {
            const data = {
                key: key,
                id: id,
                state: !state
            }

            this.$emit('finishTask', data);
        },

        goToTask(id) {
            const taskId = id;

            this.$router.push({
                name: 'Task',
                params: {taskId: taskId}
            })
        },

        goToProject(id) {
            const projectId = id;

            this.$router.push({
                name: 'Project',
                params: {projectId: projectId}
            })
        }
    }
}
