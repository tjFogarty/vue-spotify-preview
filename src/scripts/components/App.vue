<template>
  <div class="c-phone">
    <div class="c-phone__screen">
      <search></search>
      <player></player>
    </div>
  </div>    
</template>

<script>
  import Player from './Player.vue';
  import Search from './Search.vue';

  export default {
    components: {
      Player,
      Search
    },

    methods: {
      broadcastResults(results) {
        this.$broadcast('showResults', results);
      }
    },

    ready() {
      this.$on('broadcastResults', this.broadcastResults);
    }
  };
</script>