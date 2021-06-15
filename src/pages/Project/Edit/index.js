import TaskooInput from "../../../components/TaskooInput/TaskooInput"
import TaskooDatepicker from "../../../components/TaskooDatepicker/TaskooDatepicker"
import TaskooUserSelect from '../../../components/TaskoouserSelect/TaskooUserSelect';
import TaskooBoxedContent from "src/components/TaskooBoxedContent/TaskooBoxedContent"
import TaskooBoxedNavEntry from "src/components/TaskooBoxedContent/TaskooBoxedNavEntry/TaskooBoxedNavEntry"
import TaskooIconButton from 'src/components/TaskooIconButton/TaskooIconButton'
import TaskooSwitch from 'src/components/TaskooSwitch/TaskooSwitch'

import OrganisationService from "src/services/TaskooOrganisationService"
import ProjectService from "src/services/TaskooProjectService"

export default {
    name: 'EditProject',
    components: {TaskooInput, TaskooDatepicker, TaskooUserSelect, TaskooBoxedContent, TaskooBoxedNavEntry, TaskooIconButton, TaskooSwitch},

    props: {
      model: [Object]
    },

    watch: {
      '$route.params.projectId': function() {
        console.log('triggered1')
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
        projectUsers: [],
        loading:true,
        projectStatus: false,
        descriptionIsFocused: false,
        taskToolbar: [
          ["bold", "italic", "underline"]
        ],
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
        console.log('triggered2')
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
      }
    },

    methods: {
      async getOrganisationUsers() {
          const orgId = this.projectData.organisation.id

          const loaded = await OrganisationService.users.load(orgId, this)

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
        }

      },

      emitChange() {
        this.$emit('projectSaved');
      }
    }
}
