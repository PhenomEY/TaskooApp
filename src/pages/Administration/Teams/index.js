import axios from "axios";
import InputfieldEditable from "src/components/InputfieldEditable/InputfieldEditable";
import TaskooColorSelect from "src/components/TaskooColorSelect/TaskooColorSelect";
import TaskooInput from "src/components/TaskooInput/TaskooInput";
import TaskooIconButton from "components/TaskooIconButton/TaskooIconButton";
import TaskooLoaderCircle from "src/components/TaskooLoaderCircle/TaskooLoaderCircle";
import TaskooDialog from 'src/components/TaskooDialog/TaskooDialog';

import ColorService from "src/services/TaskooColorService"

export default {
    name: 'Adminteams',
    components: {InputfieldEditable, TaskooColorSelect, TaskooInput, TaskooIconButton, TaskooLoaderCircle, TaskooDialog},

    data() {
        return {
          loading: true,
          teams: null,
          saveButtons: [],
          availableColors: [],
          createName: null,
          isUpdating: false,
          showDeleteDialog: false,
          deleteData: {
            name: null
          }
        }
    },

    mounted() {
      this.getColors()
      this.load()

    },

    watch: {
    },

    props: {
    },

    computed: {
    },


    methods: {
      load() {
        this.loading = true

        axios
          .get(axios.defaults.baseURL+'/team')
          .catch(function (error) {
          })
          .then(response => {
            this.teams = response.data.teams.map(function(el) {
              var o = Object.assign({}, el);
              o.saveAble = false;
              return o;
            })
          })
      },

      async getColors() {
        const loaded = await ColorService.load(this)

        if(loaded) {
          this.availableColors = loaded.colors
        }
      },

      changedName(key, name) {
        this.teams[key].saveAble = name.length > 0;
        this.teams[key].name = name
      },

      createTeam() {
        if(!this.createName && this.createName.length === 0) {
          return;
        }

        axios
          .post(axios.defaults.baseURL+'/team', {
            name: this.createName
          })
          .catch(function (error) {
          })
          .then(response => {
            this.createName = null
            this.load()
          })
      },

      updateTeam(data, orgKey) {
        const team = data
        const key = orgKey

        this.isUpdating = true

        axios
          .put(axios.defaults.baseURL+'/team/'+team.id, {
            name: team.name,
            color: team.color.id
          })
          .catch(function (error) {
          })
          .then(response => {
            this.isUpdating = false
            this.teams[key].saveAble = false
            this.$vToastify.success(response.data.message)
          })
      },

      createdNameChanged(name) {
        this.createName = name
      },

      changedColor(key, color) {
        this.teams[key].color.id = color.id
        this.teams[key].color.hexCode = color.hexCode
        this.teams[key].saveAble = this.teams[key].name.length > 0
      },

      deleteTeam() {
        const teamId = this.deleteData.id

        axios
          .delete(axios.defaults.baseURL+'/team/'+teamId)
          .catch(function (error) {
          })
          .then(response => {
            this.load()
            this.$vToastify.success(response.data.message)

            this.toggleDeleteDialog(false);
          })
      },

      toggleDeleteDialog(data) {
        if(data === false) {
          this.deleteData = {
            name: null
          }

          this.showDeleteDialog = false
          return
        }

        this.deleteData = data
        this.showDeleteDialog = true
      }
    }
}
