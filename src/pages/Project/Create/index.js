import axios from "axios";
import TaskooInput from "../../../components/TaskooInput/TaskooInput"
import TaskooDatepicker from "../../../components/TaskooDatepicker/TaskooDatepicker"
import TaskooUserSelect from '../../../components/TaskoouserSelect/TaskooUserSelect';

import ProjectService from "src/services/TaskooProjectService"
import OrganisationService from "src/services/TaskooOrganisationService"

export default {
    name: 'CreateProject',
    components: {TaskooInput, TaskooDatepicker, TaskooUserSelect},

    data: () => ({
        projectName: null,
        deadline: null,
        closed: false,
        availableUsers: [],
        selectedUser: null
    }),


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
            console.log(this.projectName)
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
