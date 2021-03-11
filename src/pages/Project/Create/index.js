import axios from "axios";
import TaskooInput from "../../../components/TaskooInput/TaskooInput"
import TaskooDatepicker from "../../../components/TaskooDatepicker/TaskooDatepicker"
import TaskooUserSelect from '../../../components/TaskoouserSelect/TaskooUserSelect';

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

        getAvailableUsers() {
          const orgId = this.currentOrganisation.id

          console.log(this.currentOrganisation)
          axios
            .get(axios.defaults.baseURL+'/organisation/'+orgId+'/users')
            .catch(function (error) {
            })
            .then(response => {
              this.availableUsers = response.data.users;
            })
        },

        createProject() {
            const projectName = this.projectName;
            const deadline = this.deadline
            const isClosed = this.closed
            const user = this.selectedUser
            const orgId = this.currentOrganisation.id
            axios
                .post(axios.defaults.baseURL+'/project', {
                    projectName: projectName,
                    deadline: deadline,
                    closed: isClosed,
                    mainUser: user,
                    organisationId: orgId
                })
                .catch(function (error) {
                })
                .then(response => {
                    if(response.data.success == true) {
                        this.$vToastify.success("Project created");
                        this.$router.push({
                            path: '/project/'+response.data.projectId
                        })
                    }
                })
        },

      userSelected(user) {
          const userId = user.id
          this.selectedUser = userId
      }
    }
}
