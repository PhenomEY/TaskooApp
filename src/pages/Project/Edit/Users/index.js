import axios from "axios";
import TaskooUserSelect from 'src/components/TaskoouserSelect/TaskooUserSelect';
import OrganisationService from "src/services/TaskooOrganisationService";
import ProjectService from "src/services/TaskooProjectService";

export default {
    name: 'EditProjectUsers',
    components: {TaskooUserSelect},

    props: {
      model: [Object]
    },

    data() {
      return {
        availableUsers: null,
        projectData: this.model,
        selectedUser: null,
        addingUser: false,
        removingUser: false
      }
    },


    mounted() {
      this.getAvailableUsers()
    },

    computed: {
      projectId() {
        return this.$route.params.projectId
      },
    },

    methods: {
      async getAvailableUsers() {
        const orgId = this.projectData.organisation.id

        const loaded = await OrganisationService.users.load(orgId, this)

        if(loaded) {
          this.availableUsers = loaded.users;
        }
      },

      userSelected(user) {
        this.selectedUser = user
      },

      async addUser() {
        this.addingUser = true
        const selectedUser = this.selectedUser
        const projectId = this.projectData.id
        const formData = {
          addUser: selectedUser.id
        }

        const updated = await ProjectService.update(projectId, formData, this)

        if(updated) {
          this.$emit('userAdded');

          const loaded = await ProjectService.load(projectId, this);
          if(loaded) {
            this.projectData.users = loaded.project.users
          }
        }

        this.addingUser = false
      },

      async removeUser(id, key) {
        this.removingUser = true
        const projectId = this.projectData.id
        const index = key
        const formData = {
          removeUser: id
        }

        const updated = await ProjectService.update(projectId, formData, this)

        if(updated) {
          this.$emit('userAdded');

          const loaded = await ProjectService.load(projectId, this);
          if(loaded) {
            this.projectData.users = loaded.project.users
          }
        }

        this.removingUser = false
      }
    }
}
