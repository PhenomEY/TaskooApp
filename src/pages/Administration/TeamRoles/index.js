import axios from "axios";
import InputfieldEditable from "src/components/InputfieldEditable/InputfieldEditable";
import TaskooColorSelect from "src/components/TaskooColorSelect/TaskooColorSelect";
import TaskooInput from "src/components/TaskooInput/TaskooInput";
import TaskooIconButton from "components/TaskooIconButton/TaskooIconButton";
import TaskooLoaderCircle from "src/components/TaskooLoaderCircle/TaskooLoaderCircle";
import TaskooDialog from 'src/components/TaskooDialog/TaskooDialog';

import TaskooTeamRoleService from "src/services/TaskooTeamRoleService";

import ColorService from "src/services/TaskooColorService"

export default {
    name: 'AdminTeamRoles',
    components: {InputfieldEditable, TaskooColorSelect, TaskooInput, TaskooIconButton, TaskooLoaderCircle, TaskooDialog},

    data() {
        return {
          loading: true,
          teamroles: null,
          saveButtons: [],
          createName: null,
          createPriority: null,
          isUpdating: false,
          showDeleteDialog: false,
          deleteData: {
            name: null
          }
        }
    },

    mounted() {
      this.load()

    },

    watch: {
    },

    props: {
    },

    computed: {
    },


    methods: {
      async load() {
        this.loading = true
        this.teamroles = null;

        const loaded = await TaskooTeamRoleService.load();

        if(loaded) {
          this.teamroles = loaded.teamroles.map(function (el) {
            var o = Object.assign({}, el);
            o.saveAble = false;
            return o;
          })
        }

        this.loading = false;
      },

      changedName(key, name) {
        console.log(key)
        console.log(name)
        this.teamroles[key].saveAble = name.length > 0;
        this.teamroles[key].name = name
        console.log(this.teamroles)
      },

      changedPriority(key, priority) {
        this.teamroles[key].saveAble = true;
        this.teamroles[key].priority = priority
      },

      async createRole() {
        if ((!this.createName && this.createName.length === 0) || !this.createPriority) {
          return;
        }

        const data = {
          name: this.createName,
          priority: this.createPriority
        }

        const created = await TaskooTeamRoleService.create(data, this);
        if (created) {
          this.createName = null;
          this.createPriority = null;

          this.load();
        }
      },

      async updateRole(data, key) {
        const role = data
        this.isUpdating = true

        const updated = await TaskooTeamRoleService.update(data.id, data, this, true);
        if (updated) {
          this.teamroles[key].saveAble = false
          this.load()
          this.isUpdating = false
        }
      },

      createdNameChanged(name) {
        this.createName = name
      },

      createdPriorityChanged(priority) {
        this.createPriority = priority
      },

      changedColor(key, color) {
        this.teams[key].color.id = color.id
        this.teams[key].color.hexCode = color.hexCode
        this.teams[key].saveAble = this.teams[key].name.length > 0
      },

      async deleteRole() {
        const roleId = this.deleteData.id
        const deleted = await TaskooTeamRoleService.delete(roleId, this, true);

        if(deleted) {
          this.load();
        }

        this.toggleDeleteDialog(false);
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
