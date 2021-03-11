import axios from "axios";
import InputfieldEditable from "src/components/InputfieldEditable/InputfieldEditable"
import TaskooColorSelect from "src/components/TaskooColorSelect/TaskooColorSelect"
import TaskooInput from "src/components/TaskooInput/TaskooInput"

export default {
    name: 'AdminOrganisations',
    components: {InputfieldEditable, TaskooColorSelect, TaskooInput},

    data() {
        return {
          loading: true,
          organisations: null,
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
          .get(axios.defaults.baseURL+'/organisation')
          .catch(function (error) {
          })
          .then(response => {
            this.organisations = response.data.organisations.map(function(el) {
              var o = Object.assign({}, el);
              o.saveAble = false;
              return o;
            })
          })
      },

      getColors() {
        axios
          .get(axios.defaults.baseURL+'/colors')
          .catch(function (error) {
          })
          .then(response => {
            this.availableColors = response.data.colors
          })
      },

      changedName(key, name) {
        this.organisations[key].saveAble = name.length > 0;
        this.organisations[key].name = name
      },

      createOrganisation() {
        if(!this.createName && this.createName.length === 0) {
          return;
        }

        axios
          .post(axios.defaults.baseURL+'/organisation', {
            name: this.createName
          })
          .catch(function (error) {
          })
          .then(response => {
            this.createName = null
            this.load()
          })
      },

      updateOrganisation(data, orgKey) {
        const organisation = data
        const key = orgKey

        this.isUpdating = true

        axios
          .put(axios.defaults.baseURL+'/organisation/'+organisation.id, {
            name: organisation.name,
            color: organisation.color.id
          })
          .catch(function (error) {
          })
          .then(response => {
            this.isUpdating = false
            this.organisations[key].saveAble = false
            this.$vToastify.success(response.data.message)
          })
      },

      createdNameChanged(name) {
        this.createName = name
      },

      changedColor(key, color) {
        this.organisations[key].color.id = color.id
        this.organisations[key].color.hexCode = color.hexCode
        this.organisations[key].saveAble = this.organisations[key].name.length > 0
      },

      deleteOrganisation() {
        const orgId = this.deleteData.id

        axios
          .delete(axios.defaults.baseURL+'/organisation/'+orgId)
          .catch(function (error) {
          })
          .then(response => {
            this.load()
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
