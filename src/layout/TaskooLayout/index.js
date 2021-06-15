import draggable from 'vuedraggable';

import TaskooLogo from 'src/components/TaskooLogo/TaskooLogo';
import TaskooAvatar from 'src/components/TaskooAvatar/TaskooAvatar';
import TaskooTaskbar from 'src/components/TaskooTaskbar/TaskooTaskbar'

import OrganisationService from "src/services/TaskooOrganisationService";
import ProjectService from "src/services/TaskooProjectService";

export default {
  name: 'TaskooLayout',
  components: {draggable, TaskooLogo, TaskooAvatar, TaskooTaskbar},
  data: () => ({
    projects: null,
    organisationChanged: false,
    favorites: null
  }),

  computed: {
    userPermissions: function() {
      return this.$store.state.user.user.permissions
    },

    currentOrganisation: function() {
      return this.$store.state.organisations.currentOrganisation
    },

    currentUser() {
      return this.$store.state.user.user
    },

    dragOptions() {
      return {
        animation: 200,
        group: "favorites",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },



  mounted() {
    this.getProjects()
  },

  watch: {
    '$store.state.organisations.currentOrganisation': function() {
      this.projects = null
      this.organisationChanged = true
      this.getProjects(true)
    },

    '$store.state.misc.updateSidebar': function() {
      if(this.$store.state.misc.updateSidebar == true) {
        this.getProjects()
      }
    },
  },

  methods: {

    async getProjects(changedOrg) {
      if(!this.$store.state.organisations.currentOrganisation) return;
      const orgId = this.$store.state.organisations.currentOrganisation.id;
      if(!orgId) {
        return;
      }

      this.$store.commit('misc/updateSidebar', false);

      const loaded = await OrganisationService.projects.load(orgId, this)

      if(loaded) {
        this.projects = loaded.projects

        if(loaded.favorites.length > 0) {
          this.favorites = loaded.favorites
        } else {
          this.favorites = false
        }
      }
    },


    goToName(target) {
      if (this.$route.name === target) return

      this.$router.push({
        name: target
      })
    },

    goToPath(target, id) {
      this.$router.push({
        path: target+id
      })
    },

    toggleMenu() {
      let body = document.body;
      if(!body.classList.contains('open-menu')) {
        body.classList.add('open-menu')
      } else {
        body.classList.remove('open-menu')
      }
    },

    async updateFavorites(favorites) {
      const positions = favorites.map(x => x.favoriteId);

      const updated = await ProjectService.favorite.update(positions, this);
    },

    logout() {
      this.$store.commit('auth/setAuthToken', null)
      this.$store.commit('auth/setVerifiedUser', false)
      this.$store.commit('user/setUser', null)
      this.$router.push({
        name: 'Login'
      })
    },
  }
}
