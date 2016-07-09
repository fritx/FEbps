<template>
  <section class="demo__section">
    <div class="demo__input-area">
      <fieldset v-el:fieldset class="demo__option-field">
        <legend>Choose a sample image:</legend>
        <img v-for="item in sampleData" class="demo__option-img"
          :src="`/static/img/${item}.jpg`" :alt="`${item} image`"
          @click="sampleClick($event.target)">
        <button class="take-photo" @click="takePhoto()">Take a photo!</button>
        <br>
        <label class="demo__input-label">
          Or paste in a link to your own photo:
          <input class="demo__input-img" type="text" v-el:input v-model="inputValue" @input="inputInput()" @focus="inputFocus()">
        </label>
      </fieldset>

      <video-container v-el:camera></video-container>
      <small class="demo__note">Hovering over any of these images (or clicking on mobile) will remove the filter effect to visualize the changes.</small>
    </div>

    <ul class="demo__list">
      <li class="demo__item" v-for="item in listData">
        <figure :class="[item[0]]">
          <img :src="imageSrc">
          <figcaption>{{item[1]}}</figcaption>
        </figure>
      </li>
    </ul>
  </section>
</template>

<script>
import VideoContainer from './VideoContainer'

// broadcast: take-photo
export default {
  components: { VideoContainer },
  props: ['sampleData', 'listData'],

  data () {
    return {
      imageSrc: null,
      inputValue: ''
    }
  },

  ready () {
    const img = this.$els.fieldset.querySelector('img')
    this.sampleClick(img)
  },

  events: {
    snapshot (src) {
      this.updateImages(src)
    }
  },

  methods: {
    inputFocus () {
      this.$els.input.select()
    },
    inputInput () {
        // wait for next tick
        // get the correct input value
      this.$nextTick(() => {
        this.updateImages(this.inputValue)
      })
    },
    sampleClick (img) {
      const src = img.getAttribute('src')
      this.inputValue = src
      this.updateImages(src)
    },

    updateImages (src) {
      this.imageSrc = src
    },
    takePhoto () {
      this.$broadcast('take-photo')
    }
  }
}
</script>
