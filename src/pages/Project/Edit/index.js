import TaskooInput from "../../../components/TaskooInput/TaskooInput"
import TaskooDatepicker from "../../../components/TaskooDatepicker/TaskooDatepicker"
import TaskooUserSelect from '../../../components/TaskoouserSelect/TaskooUserSelect';
import TaskooBoxedContent from "src/components/TaskooBoxedContent/TaskooBoxedContent"
import TaskooBoxedNavEntry from "src/components/TaskooBoxedContent/TaskooBoxedNavEntry/TaskooBoxedNavEntry"
import TaskooIconButton from 'src/components/TaskooIconButton/TaskooIconButton'
import TaskooSwitch from 'src/components/TaskooSwitch/TaskooSwitch'
import TaskooDialog from 'src/components/TaskooDialog/TaskooDialog'

import TeamService from "src/services/TaskooTeamService"
import ProjectService from "src/services/TaskooProjectService"

export default {
    name: 'EditProject',
    components: {TaskooInput, TaskooDatepicker, TaskooUserSelect, TaskooBoxedContent, TaskooBoxedNavEntry, TaskooIconButton, TaskooSwitch, TaskooDialog},

    props: {
      model: [Object]
    },

    watch: {
      '$route.params.projectId': function() {
        this.$router.push({
          name: 'Project'
        })
      }
    },

    data() {
      return {
        projectData: {
          isClosed: false
        },
        projectDate: null,
        projectUsers: null,
        loading:true,
        projectStatus: false,
        descriptionIsFocused: false,
        taskToolbar: [
          ["bold", "italic", "underline"]
        ],
        showDeleteDialog: false
      }
    },


    mounted() {
      if(!this.$store.state.user.user.permissions || (!this.$store.state.user.user.permissions.administration && !this.$store.state.user.user.permissions.project_edit)) {
        this.$router.push({
          name: 'Dashboard'
        })
        return;
      }

      this.projectData = JSON.parse(JSON.stringify(this.model));
      this.projectStatus = this.projectData.isClosed

      if(!this.projectData.id) {
        this.$router.push({
          name: 'Project'
        })
        return;
      }

      if(this.projectData.deadline) {
        this.projectDate = new Date(this.projectData.deadline.date.replace(' ', 'T'));
      }

      if(!this.projectData.isClosed) {
        this.getOrganisationUsers()
      } else {
        this.projectUsers = this.projectData.users
        this.loading = false
      }
    },

    computed: {
      projectId() {
        return this.$route.params.projectId
      },
      currentUser() {
        return this.$store.state.user.user
      },
    },

    methods: {
      async getOrganisationUsers() {
          const orgId = this.projectData.team.id

          const loaded = await TeamService.users.load(orgId, this)

          if(loaded) {
            this.projectUsers = loaded.users
            this.loading = false
          }
      },

      setMainUser(user) {
        this.projectData.mainUser = user
      },

      setDeadline(date) {
        this.projectDate = date
      },

      setProjectName(name) {
        this.projectData.name = name
      },

      async save() {
        const isClosed = this.projectStatus
        const name = this.projectData.name
        const deadline = this.projectDate
        const mainUser = this.projectData.mainUser
        const description = this.projectData.description

        let formData = {
          isClosed: isClosed,
          name: name,
          deadline: deadline,
          description: description
        }

        if(mainUser) {
          formData.mainUser = mainUser.id
        }

        const saved = await ProjectService.update(this.projectData.id, formData, this, true)

        if(saved) {
          this.emitChange()
          this.projectData.isClosed = isClosed
          this.$store.commit('misc/updateProjects', true);
        }
      },

      emitChange() {
        this.$emit('projectSaved');
      },

      async deleteProject() {
        const deleted = await ProjectService.delete(this.projectData.id, this);

        if(deleted) {
          this.$router.push({
            name: 'Dashboard'
          });
          this.$store.commit('misc/updateProjects', true);
        }
      },

      toggleDeleteDialog() {
        this.showDeleteDialog = !this.showDeleteDialog
      }
    }
}
