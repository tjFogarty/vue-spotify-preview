<template>
  <div class="c-search-container">
    <form class="c-search" v-on:submit="onSubmit" @submit.prevent>
      <input type="search" placeholder="Search for an artist..." class="c-search__input" v-model="searchTerm">
      <button type="submit" class="c-search__submit">Search</button>
    </form>

    <p v-if="showError && searchTerm.length" class="c-search__message">{{ searchTerm }} not found</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        searchTerm: 'TesseracT',
        showError: false
      }
    },

    ready() {
      this.performSearch();
    },

    methods: {
      onSubmit() {
        this.performSearch();
      },

      performSearch() {
        let term = this.$get('searchTerm');

        this.$http.get('https://api.spotify.com/v1/search', {q: term, type: 'album'}).then(response => {
          if (response.status === 200 && response.data.albums.total) {
            this.$set('showError', false);
            this.$dispatch('broadcastResults', response.data.albums.items);
          } else {
            this.$set('showError', true);
          }
        });
      }
    }
  };
</script>