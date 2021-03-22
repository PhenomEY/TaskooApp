import axios from "axios";
import TaskooTaskbar from "../components/TaskooTaskbar/TaskooTaskbar";

export default {
  name: 'LayoutSidebar',
  components: {TaskooTaskbar},
  data: () => ({
    projects: null,
    organisationChanged: false
  }),

  computed: {
    userPermissions: function() {
      return this.$store.state.user.user.permissions
    },

    currentOrganisation: function() {
      return this.$store.state.organisations.currentOrganisation
    }
  },

  mounted() {
    this.getProjects()
  },

  watch: {
    '$store.state.organisations.currentOrganisation': function() {
      this.projects = null
      this.organisationChanged = true
      this.getProjects(true)
    },
  },

  methods: {

    getProjects(changedOrg) {
      if(!this.$store.state.organisations.currentOrganisation) return;

      const orgId = this.$store.state.organisations.currentOrganisation.id;

      if(!orgId) {
        return;
      }

      axios
        .get(axios.defaults.baseURL+'/organisation/'+orgId+'/projects')
        .catch(function (error) {
        })
        .then(response => {
          if(this.organisationChanged && !changedOrg) return
          this.projects = response.data.projects
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

    toggleMenu() {
      let body = document.body;
      if(!body.classList.contains('open-menu')) {
        body.classList.add('open-menu')
      } else {
        body.classList.remove('open-menu')
      }
    },
  }
}
