import TaskooColorSelect from "components/TaskooColorSelect/TaskooColorSelect";
import TaskooAvatar from "components/TaskooAvatar/TaskooAvatar";

import FileService from "src/services/TaskooFileService"
import ColorService from "src/services/TaskooColorService";
import UserService from "src/services/TaskooUserService";

export default {
  name: 'ProfileSettings',
  components: {TaskooColorSelect, TaskooAvatar},

  data() {
    return {
      updatingUser: false,
      availableColors: []
    }
  },

  props: {
    user: Object
  },

  computed: {
    API_URL: function () {
      return window.API_URL
    }
  },

  mounted() {
    //set title
    this.setTitle(this.$t('settings.profile_settings.title'));
    this.getColors()
  },


  methods: {
    async getColors() {
      const loaded = await ColorService.load(this)

      if(loaded) {
        this.availableColors = loaded.colors
      }
    },

    async upload() {
      const file = this.$refs['fileinput'].files[0];
      if(!file) return;

      const uploaded = await FileService.upload(file, null, this, true)

      if(uploaded) {
        this.$emit('avatarChanged', uploaded.avatar)
      }
    },

    async changeColor(color) {
      const colorId = color.id;
      const userId = this.user.id;

      const formData = {
        color: colorId
      };

      const updated = UserService.update(userId, formData, this, true);

      if(updated) {
        this.$emit('colorChanged', color);
      }
    }
  }
}
