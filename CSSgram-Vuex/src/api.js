export function videoDataURL (video) {
  const canvas = document.createElement('canvas')
  const { width, height } = video
  canvas.width = width
  canvas.height = height
  canvas.getContext('2d').drawImage(video, 0, 0, width, height)
  return canvas.toDataURL()
}

// todo: promise resolve/reject
export function takeUserMedia (video) {
  // CAMERA
  /*
  Implementation of Matt West's excellent "Accessing the Device Camera with getUserMedia" article found at http://blog.teamtreehouse.com/accessing-the-device-camera-with-getusermedia
  */
  // Normalize the various vendor prefixed versions of getUserMedia.
  navigator.getUserMedia = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia)

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
        // const vid = this.$els.video

        // Create an object URL for the video stream and use this
        // to set the video source.
        video.src = window.URL.createObjectURL(localMediaStream)
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
}
