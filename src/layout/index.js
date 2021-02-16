import axios from "axios";
import TaskooTaskbar from "../components/TaskooTaskbar/TaskooTaskbar";

export default {
  name: 'LayoutSidebar',
  components: {TaskooTaskbar},
  data: () => ({
    projects: null
  }),

  mounted() {
    this.getTestData()
  },

  watch: {
  },

  computed: {
    userType: function() {
      return this.$store.state.user.user.role
    }
  },
  methods: {
    getTestData() {
      axios
        .get('https://api.taskoo.de/api/getProjectNavTestData')
        .catch(function (error) {
        })
        .then(response => {
          this.projects = response.data.data.projects
        })
    },


    goToName(target) {
      if (this.$route.name === target) return

      this.$router.push({
        name: target
      })
    },

    goToPath(target, id) {
      this.$router.push({
        path: target+id
      })
    },
  }
}
