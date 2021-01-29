<template>
  <div class="taskoo-refresh">
    <md-progress-spinner class="spinner" md-mode="determinate" :md-diameter="28" :md-stroke="3" :md-value="loadingValue"></md-progress-spinner>

    <md-button v-if="active == true || active == 'true'" class="md-icon-button" @click="deactivate">
      <md-icon>pause</md-icon>
    </md-button>

    <md-button v-else class="md-icon-button" @click="activate">
      <md-icon>refresh</md-icon>
    </md-button>
  </div>
</template>

<style lang="scss">
@import "../../../scss/vars/variables";

  .taskoo-refresh {
    width: 28px;
    height:28px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .spinner {
      position: absolute;
      left:0;
      top:0;

      .md-progress-spinner-circle {
        stroke:$taskoo-main !important;
      }
    }

    .md-icon-button {
      margin:0;
    }
  }
</style>

<script>
import axios from "axios";

export default {
  name: 'TaskooRefresh',
  components: {},
  data: () => ({
    active: false,
    loop: null,
    second:0,
    loadingValue:0,
    isRefreshing: false
  }),

  props: {
    interval:Number,
  },

  watch: {
    '$store.state.contentRefreshActive': function() {
      this.active = this.$store.state.misc.contentRefreshActive;
    },

    '$store.state.contentRefresh': function() {
      if (this.$store.state.misc.contentRefresh == true) {
        this.isRefreshing = true;
      } else {
        this.isRefreshing = false;
      }

    },
  },

  mounted() {
    this.active = this.$store.state.misc.contentRefreshActive;

    if(this.active == 'true' || this.active == true) {
      this.loop = setInterval(() => {this.refresh()}, 1000);
    } else {
      clearInterval(this.loop);
    }
  },

  computed: {
  },
  methods: {
      refresh() {
        if(this.isRefreshing == true) { return;}

        if(this.second == parseInt(this.interval)) {
          this.$store.commit('misc/toggleRefresh', true);
          this.second = 0;
        } else {
          this.loadingValue = this.loadingValue + (100 / this.interval);
          this.second++;
        }
      },

    deactivate() {
      this.$store.commit('misc/toggleRefreshActive', false);
        clearInterval(this.loop);
        this.second = 0;
        this.loadingValue = 0;
    },

    activate() {
      this.$store.commit('misc/toggleRefreshActive', true);
      this.active = true;
      this.loop = setInterval(() => {this.refresh()}, 1000);
    }
  }
}
</script>
