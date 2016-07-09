<template>
  <section class="video-container" v-el:video-container>
    <video v-el:video width="480px" height="360px" autoplay></video>
    <button id="snapshot" @click="snapshot()">Use snapshot</button>
    <canvas v-el:canvas style="display: none"></canvas>
  </section>
</template>

<script>
// dispatch: snapshot
export default {
  events: {
    'take-photo' () {
      this.takePhoto()
    }
  },

  methods: {
    snapshot () {
      const canvas = this.$els.canvas
      canvas.getContext('2d').drawImage(this.$els.video, 0, 0, canvas.width,
        canvas.height)
      this.$dispatch('snapshot', canvas.toDataURL())
    },

    takePhoto () {
      // CAMERA
      /*
      Implementation of Matt West's excellent "Accessing the Device Camera with getUserMedia" article found at http://blog.teamtreehouse.com/accessing-the-device-camera-with-getusermedia
      */
      // Normalize the various vendor prefixed versions of getUserMedia.
      navigator.getUserMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia)

      // open up the section
      this.$els.videoContainer.style.maxHeight = '420px'

      // Check that the browser supports getUserMedia.
      // If it doesn't show an alert, otherwise continue.
      if (navigator.getUserMedia) {
        // Request the camera.
        navigator.getUserMedia(
          // Constraints
          {
            video: true
          },

          // Success Callback
          localMediaStream => {
            // Get a reference to the video element on the page.
            const vid = this.$els.video

            // Create an object URL for the video stream and use this
            // to set the video source.
            vid.src = window.URL.createObjectURL(localMediaStream)
          },

          // Error Callback
          err => {
            // Log the error to the console.
            console.log('The following error occurred when trying to use getUserMedia: ' + err)
          }
        )
      } else {
        window.alert('Sorry, your browser does not support getUserMedia')
      }

      // Put variables in global scope to make them available to the browser console.
      const canvas = this.$els.canvas
      canvas.width = 480
      canvas.height = 360
    }
  }
}
</script>
