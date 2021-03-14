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
        project: this.model,
        projectDate: null,
        projectUsers: [],
        loading:true
      }
    },


    mounted() {
      if(!this.project.id) {
        this.$router.push({
          name: 'Project'
        })
        return;
      }

      if(this.project.deadline) {
        this.projectDate = new Date(this.project.deadline.date);
      }

      if(!this.project.isClosed) {
        this.getOrganisationUsers()
      } else {
        this.projectUsers = this.project.users
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
          const orgId = this.project.organisation.id

          const loaded = await OrganisationService.users.load(orgId, this)

          if(loaded) {
            this.projectUsers = loaded.users
            this.loading = false
          }
      },

      setMainUser(user) {
        this.project.mainUser = user
      },

      setDeadline(date) {
        this.projectDate = date
      },

      setProjectName(name) {
        this.project.name = name
      },

      async save() {

        const isClosed = this.project.isClosed
        const name = this.project.name
        const deadline = this.projectDate
        const mainUser = this.project.mainUser

        let formData = {
          isClosed: isClosed,
          name: name,
          deadline: deadline
        }

        if(mainUser) {
          formData.mainUser = mainUser.id
        }


        const saved = await ProjectService.update(this.project.id, formData, this, true)

        if(saved) {
          this.$emit('projectSaved');
        }

      }
    }
}
