import TaskooSwitch from "src/components/TaskooSwitch/TaskooSwitch"
import TaskooAvatar from "src/components/TaskooAvatar/TaskooAvatar"
import TaskooIconButton from "src/components/TaskooIconButton/TaskooIconButton"

export default {
    name: 'Test',
    components: { TaskooSwitch, TaskooAvatar, TaskooIconButton },

    data() {
        return {
          testValue: true,
          testValue2: false
        }
    },


    watch: {
    },

    mounted() {

    },

    computed: {
      currentUser() {
        return this.$store.state.user.user
      },
    },

    methods: {
    }
}
