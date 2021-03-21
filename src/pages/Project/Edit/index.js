import axios from "axios";
import TaskooInput from "../../../components/TaskooInput/TaskooInput"
import TaskooDatepicker from "../../../components/TaskooDatepicker/TaskooDatepicker"
import TaskooUserSelect from '../../../components/TaskoouserSelect/TaskooUserSelect';

import OrganisationService from "src/services/TaskooOrganisationService"
import ProjectService from "src/services/TaskooProjectService"
import form from "quasar/src/mixins/form";

export default {
    name: 'EditProject',
    components: {TaskooInput, TaskooDatepicker, TaskooUserSelect},

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
        projectData: null,
        projectDate: null,
        projectUsers: [],
        loading:true,
        projectStatus: false
      }
    },


    mounted() {
      if(this.$store.state.user.user.role !== 10) {
        this.$router.push({
          name: 'Dashboard'
        })
      }

      this.projectData = this.model
      this.projectStatus = this.projectData.isClosed

      if(!this.projectData.id) {
        this.$router.push({
          name: 'Project'
        })
        return;
      }

      if(this.projectData.deadline) {
        this.projectDate = new Date(this.projectData.deadline.date);
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
      close(e) {
        //trigger close on wrapper click
        if (e.target.classList.contains('edit-project-wrapper')) {
          this.$router.push({
            name: 'Project'
          })
        }
      },

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

        let formData = {
          isClosed: isClosed,
          name: name,
          deadline: deadline
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
