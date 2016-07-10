<style>
  .video-container {
    max-height: 420px;
  }
</style>

<template>
  <section class="video-container" v-show="showCamera">
    <video v-el:video width="480" height="360" autoplay></video>
    <button id="snapshot" @click="snapshotClick()">Use snapshot</button>
  </section>
</template>

<script>
import { showCamera } from '../vuex/state'
import { takePhoto, snapshot } from '../vuex/mutations'

// receive: take-photo
export default {
  vuex: {
    getters: { showCamera },
    actions: { takePhoto, snapshot }
  },

  events: {
    'take-photo' () {
      this.takePhoto(this.$els.video)
    }
  },

  methods: {
    snapshotClick () {
      this.snapshot(this.$els.video)
    }
  }
}
</script>
