import axios from "axios";
import TaskooInput from "components/TaskooInput/TaskooInput";
import TaskooLoader from "components/TaskooLoader/TaskooLoader";

export default {
    name: 'invite',
    components: {TaskooInput, TaskooLoader},

    data: () => ({
      verifying: true,
    }),
    methods: {
    }
}
