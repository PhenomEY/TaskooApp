import SearchService from 'src/services/TaskooSearchService';

export default {
    name: 'TaskooSearch',
    components: {},

    data() {
        return {
          search: null,
          results: null,
          isFocused: false,
          type: 'all',
          loading:false
        }
    },

    mounted() {
    },

    watch: {
      '$route': function () {
        this.resetSearch()
      }
    },

    computed: {
      API_URL: function () {
        return window.API_URL
      },
    },


    methods: {
      async toggleSearch() {
        if(!this.search || this.search.length < 3) return;

        this.loading = true
        this.results = null
        const results = await SearchService.search(this.search, this, 5, 0, this.type);

        if(results) {
          this.loading = false
          this.results = results
        }

      },

      focusedSearch() {
        this.isFocused = true
      },

      blurredSearch() {
        this.isFocused = false
      },

      resetSearch() {
        this.results = null;
      },

      switchType(type) {
        this.type = type
        this.toggleSearch()
      }
    }
}
