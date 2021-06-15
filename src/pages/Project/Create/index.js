import TaskooInput from "src/components/TaskooInput/TaskooInput";
import TaskooDatepicker from "src/components/TaskooDatepicker/TaskooDatepicker";
import TaskooUserSelect from 'src/components/TaskoouserSelect/TaskooUserSelect';
import TaskooBoxedContent from 'src/components/TaskooBoxedContent/TaskooBoxedContent';
import TaskooSwitch from 'src/components/TaskooSwitch/TaskooSwitch'

import ProjectService from "src/services/TaskooProjectService";
import TeamService from "src/services/TaskooTeamService";

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
      '$store.state.teams.currentTeam': function() {
        this.getAvailableUsers()
      }
    },


    mounted() {
      this.getAvailableUsers()
    },

    computed: {
      currentTeam() {
          return this.$store.state.teams.currentTeam
      },

      availableTeams() {
        return this.$store.state.teams.availableTeams
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
          const teamId = this.currentTeam.id

          const loaded = await TeamService.users.load(teamId, this)

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
              teamId: this.currentTeam.id
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
