import TaskooInput from "src/components/TaskooInput/TaskooInput";
import TaskooDatepicker from "src/components/TaskooDatepicker/TaskooDatepicker";
import TaskooUserSelect from 'src/components/TaskoouserSelect/TaskooUserSelect';
import TaskooBoxedContent from 'src/components/TaskooBoxedContent/TaskooBoxedContent';
import TaskooSwitch from 'src/components/TaskooSwitch/TaskooSwitch'

import ProjectService from "src/services/TaskooProjectService";
import OrganisationService from "src/services/TaskooOrganisationService";

export default {
    name: 'CreateProject',
    components: {TaskooInput, TaskooDatepicker, TaskooUserSelect, TaskooBoxedContent, TaskooSwitch},

    data: () => ({
        projectName: null,
        deadline: null,
        closed: false,
        availableUsers: [],
        selectedUser: null
    }),

    watch: {
      '$store.state.organisations.currentOrganisation': function() {
        this.getAvailableUsers()
      }
    },


    mounted() {
      this.getAvailableUsers()
    },

    computed: {
      currentOrganisation() {
          return this.$store.state.organisations.currentOrganisation
      },

      availableOrganisations() {
        return this.$store.state.organisations.availableOrganisations
      },
    },

    methods: {
        setProjectName(val) {
            this.projectName = val
        },

        setDeadline(val) {
            this.deadline = val
        },

        async getAvailableUsers() {
          const orgId = this.currentOrganisation.id

          const loaded = await OrganisationService.users.load(orgId, this)

          if(loaded) {
            this.availableUsers = loaded.users;
          }
        },

        async createProject() {

            const formData = {
              projectName: this.projectName,
              deadline: this.deadline,
              closed: this.closed,
              mainUser: this.selectedUser,
              organisationId: this.currentOrganisation.id
            }

            const created = await ProjectService.create(formData, this);

            if(created) {
              this.$router.push({
                path: '/project/'+created.projectId
              })
            }
        },

      userSelected(user) {
          const userId = user.id
          this.selectedUser = userId
      }
    }
}
