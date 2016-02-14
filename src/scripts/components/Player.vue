<template>
  <div class="c-player">
    <div class="c-player__current">
      <img v-if="artistImage" v-bind:src="artistImage" alt="In Flames" class="c-player__artist-image" />

      <div class="c-player__controls" v-if="track">
        <input type="range" v-model="trackTime">
        <button v-on:click="pauseTrack" class="c-player__pause" v-show="playing">
          <span class="u-show-for-sr">Pause</span>
        </button>
        <button v-on:click="playTrack" class="c-player__play" v-show="!playing">
          <span class="u-show-for-sr">Play</span>
        </button>
      </div>
    </div>
    
    <div class="c-player__playlist-container">
      
      <ul class="c-player__playlist">
        <li class="c-player__playlist-item" v-for="album in albums" transition="album-drop-in" stagger="50" v-on:click="handleClick(album)">
          <div class="c-player__album-preview">
            <img v-bind:src="album.images[0].url" alt="{{ album.name }}">
          </div>
          <h3 class="c-player__playlist-item-title">{{ album.name }}</h3>
        </li>
      </ul>
      
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        albums: [],
        artistImage: '',
        track: null,
        playing: false,
        trackTime: 0
      }
    },

    methods: {
      audioTimeUpdated() {
        let track = this.$get('track'),
            amountPlayed = (track.currentTime / track.duration) * 100;

        this.$set('trackTime', amountPlayed);
      },

      addListeners() {
        let track = this.$get('track');
        track.addEventListener('timeupdate', this.audioTimeUpdated, false);
      },

      handleClick(item) {
        let phoneScreen = document.querySelector('.c-phone__screen');
        let track = this.$get('track');

        phoneScreen.scrollTop = 0;

        this.$set('artistImage', item.images[0].url);

        this.fetchTrack(item.id);
      },

      fetchTrack(id) {
        this.$http.get('https://api.spotify.com/v1/albums/' + id).then(response => {
          let track = this.$get('track');

          if (track) {
            track.pause();
          }

          let audioObject = new Audio(response.data.tracks.items[0].preview_url);

          audioObject.play();

          this.$set('playing', true);

          this.$set('track', audioObject);

          this.addListeners();
        });
      },

      pauseTrack() {
        let track = this.$get('track');

        if (track) {
          track.pause();
          this.$set('playing', false);
        }
      },

      playTrack() {
        let track = this.$get('track');

        if (track) {
          track.play();
          this.$set('playing', true);
        }
      }
    },

    ready() {
      this.$on('showResults', (results) => {
        this.$set('albums', results);
        this.$set('artistImage', results[0].images[0].url);

        this.pauseTrack();
        this.$set('track', null);
      });
    }
  };
</script>