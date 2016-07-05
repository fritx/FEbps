<template>
  <div id="app">
    <section class="title-section">
      <img class="title--logo" src="assets/cssgram-logo.svg" alt="CSSgram">
      <h2 class="title--top-sub">A tiny (&lt;1kb gzipped!) library for recreating <a href="http://instagram.com">Instagram</a> filters with CSS filters and blend modes.</h2>
    </section>
    <section class="demo__section">
      <div class="demo__input-area">
        <fieldset class="demo__option-field">
          <legend>Choose a sample image:</legend>
          <img class="demo__option-img" src="/static/img/atx.jpg" alt="atx image">
          <img class="demo__option-img" src="/static/img/bike.jpg" alt="bike image">
          <img class="demo__option-img" src="/static/img/cacti.jpg" alt="cacti image">
          <img class="demo__option-img" src="/static/img/lakegeneva.jpg" alt="lakegeneva image">
          <img class="demo__option-img" src="/static/img/tahoe.jpg" alt="tahoe image">
          <button class="take-photo" @click="takePhoto()">Take a photo!</button>
          <br>
          <label class="demo__input-label">
            Or paste in a link to your own photo:
            <input class="demo__input-img" type="text" v-el:aaa v-model="inputValue" @input="inputInput()" @focus="inputFocus()">
          </label>
        </fieldset>
        <section class="video-container">
          <video id="camera-stream" width="480px" height="360px" autoplay></video>
          <button id="snapshot" @click="snapshot()">Use snapshot</button>
          <canvas style="display: none"></canvas>
        </section>
        <small class="demo__note">Hovering over any of these images (or clicking on mobile) will remove the filter effect to visualize the changes.</small>
      </div>
      <ul class="demo__list">
        <li class="demo__item" v-for="item in listData">
          <figure :class="[item[0]]">
            <img>
            <figcaption>{{item[1]}}</figcaption>
          </figure>
        </li>
      </ul>
    </section>
    <section class="explanation-section">
      <h2>What is This?</h2>
      <p><strong class="callout">For more background on CSS Image Effects, you can check out my blog series <a href="https://una.im">here</a>, or watch my <a href="https://www.youtube.com/watch?v=LY65F2e4B5w">video</a> from CSS Conf EU, which gives a baseline on blend modes and filters.</strong></p>
      <p>Simply put, CSSgram is a library for editing your images with Instagram-like filters directly in CSS. What we're doing here is adding filters to the images as well as applying color and/or gradient overlays via various blending techniques to mimic these effects. This means <em>less manual image processing</em> and more fun filter effects on the web!</p>
      <p>We are using pseudo-elements (i.e. <code>:before</code> and <code>:after</code>) to create the filter effects, so you must apply these filters on a containing element (i.e. not a content-block like <code>&lt;img&gt;</code>. The recommendation is to wrap your images in a <code>&lt;figure&gt;</code> tag. More about the tag <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure">here.</a></p>
      <h3>Browser Support</h3>
      <p>This library uses <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/filter">CSS Filters</a> and <a href="https://css-tricks.com/basics-css-blend-modes/">CSS Blend Modes</a>. These features are supported in the following browsers:</p>
      <ul class="supported-browsers">
        <li class="supported">Google Chrome: 43+</li>
        <li class="supported">Mozilla Firefox: 38+</li>
        <li class="not-supported">Internet Explorer: Nope</li>
        <li class="supported">Opera: 32+</li>
        <li class="supported">Safari: 8+</li>
      </ul>
      <p>For more information, check on <a href="http://caniuse.com/">Can I Use</a>.</p>
      <hr>
    </section>
    <section class="how-to-section">
      <h2>Usage</h2>
      <p><strong>There are currently 3 ways to consume this library:</strong></p>
      <h3 id="use-css-classes">1. Use CSS classes</h3>
      <p>When using CSS classes, you can simply add the class with the filter name to the element containing your image.</p>
      <p><strong>The quickest way to do this is to link to our CDN</strong> in your <code>&lt;head&gt;</code> tag: <code>&lt;link rel="stylesheet" href="https://cssgram-cssgram.netdna-ssl.com/cssgram.min.css"&gt;</code>. Then, add a class to your figure element with the name of the filter you would like to use (shown below)</p>
      <p>If you want to work locally, do the following:</p>
      <ol>
        <li><a href="https://raw.githubusercontent.com/una/CSSgram/master/source/css/cssgram.min.css" download>Download the CSSgram Library</a></li>
        <li>Link to the CSSgram library within your project:
          <br><code>&lt;link rel="stylesheet" href="css/vendor/cssgram.min.css"&gt;</code></li>
        <li>Add a class to your figure element with the name of the filter you would like to use</li>
      </ol>
      <p>For example:</p>
      <pre><code>
      {{'  '}}<span class="comment">&lt;!-- HTML --&gt;</span>
        &lt;figure <span class="highlight">class="aden"</span>&gt;
          &lt;img src="../img.png"&gt;
        &lt;/figure&gt;
      </code></pre>
      <small>Alternatively, you can just download and link to any individual css file: <br> <code>&lt;link rel="stylesheet" href="css/vendor/aden.min.css"&gt;</code>, if you're just using one of the styles.</li></small>
      <h3>Available Classes</h3>
      <small><em>For use in HTML markup:</em></small>
      <ul class="available-classes">
        <li v-for="item in listData">{{item[1]}}: <code>class="{{item[0]}}"</code></li>
      </ul>
      <hr>
      <h3>2. Use Sass <code>@extends</code></h3>
      <p>If you use custom naming in your CSS architecture, you can add the .scss files for the provided styles within your project and then <code>@extend</code> the filter effects within your style definitions. If you think extends are stupid, I will fight you 😊.</p>
      <ol>
        <li><a href="https://github.com/una/CSSgram/tree/master/source/scss" download>Download the /scss folder contents</a></li>
        <li>Include a link to <code>scss/cssgram.scss</code> via an import statement in your Sass manifest file (i.e. <code>main.scss</code>). It may look like: <code>@import 'vendor/cssgram';</code></li>
        <li>Extend the silent placeholder selector <code>@extend %aden;</code> in your element.</li>
      </ol>
      <p>For example:</p>
      <pre><code>
      {{'  '}}<span class="comment">&lt;!-- HTML --&gt;</span>
        &lt;figure class=<span class="highlight">"viz--beautiful"</span>&gt;
          &lt;img src="../img.png"&gt;
        &lt;/figure&gt;
      </code></pre>
      <pre><code>
      {{'  '}}<span class="comment">// Sass</span>&nbsp;
        <span class="highlight">.viz--beautiful</span> {
          @extend %aden;
        }
      </code></pre>
      <small>Alternatively, you can just download and link any individual .scss file in your Sass manifest: <br> (i.e. <code>scss/aden.scss</code>), if you're just using one of the styles.</li></small>
      <h3>Available Extends</h3>
      <small><em>For use in Sass elements:</em></small>
      <ul class="available-classes">
        <li v-for="item in listData">{{item[1]}}: <code>@extend %{{item[0]}};</code></li>
      </ul>
      <hr>
      <h3>3. Use Sass <code>@mixins</code></h3>
      <p>Mixins allow for multiple filter arguments to be passed into your classes. This is useful for if you want to add filters in addition to the ones provided (i.e. add a blur).</p>
      <ol>
        <li><a href="https://github.com/una/CSSgram/tree/master/source/scss" download>Download the /scss folder contents</a></li>
        <li>Include a link to <code>scss/cssgram.scss</code> via an import statement in your Sass manifest file (i.e. <code>main.scss</code>). It may look like: <code>@import 'vendor/cssgram';</code></li>
        <li>Include the mixin <code>@include aden()</code> in your element.</li>
      </ol>
      <p>For example:</p>
      <pre><code>
      {{'  '}}<span class="comment">&lt;!-- HTML --&gt;</span>
        &lt;figure class=<span class="highlight">"viz--beautiful"</span>&gt;
          &lt;img src="../img.png"&gt;
        &lt;/figure&gt;
      </code></pre>
      <pre><code>
      {{'  '}}<span class="comment">// Sass</span>&nbsp;
        <span class="highlight">.viz--beautiful</span> {
          @include aden()
        }
      </code></pre>
      <p>As mentioned above, you can also add additional filters as arguments when using the library with mixins:</p>
      <pre><code>
      {{'  '}}<span class="comment">// Sass</span>&nbsp;
        <span class="highlight">.viz--beautiful</span> {
          @include @include aden(blur(2px) /*...*/);
        }
      </code></pre>
      <h3>Available Mixins</h3>
      <small><em>For use in Sass elements:</em></small>
      <ul class="available-classes">
        <li v-for="item in listData">{{item[1]}}: <code>@include {{item[0]}}();</code></li>
      </ul>
      <hr>
    </section>
    <footer class="attribution">Made with love by <a href="http://twitter.com/una">Una</a> | <a href="http://github.com/una/CSSgram">View Source</a>
      <br>Adopted by <a href="https://github.com/fritx/FEbps">FEbps</a>
    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputValue: '',
      listData: [
        [null, ' #nofilter'],
        ['_1977', ' 1977'],
        ['aden', ' Aden'],
        ['brooklyn', ' Brooklyn'],
        ['clarendon', ' Clarendon'],
        ['earlybird', ' Earlybird'],
        ['gingham', ' Gingham'],
        ['hudson', ' Hudson'],
        ['inkwell', ' Inkwell'],
        ['lark', ' Lark'],
        ['lofi', ' Lo-Fi'],
        ['mayfair', ' Mayfair'],
        ['moon', ' Moon'],
        ['nashville', ' Nashville'],
        ['perpetua', ' Perpetua'],
        ['reyes', ' Reyes'],
        ['rise', ' Rise'],
        ['slumber', ' Slumber'],
        ['toaster', ' Toaster'],
        ['walden', ' Walden'],
        ['willow', ' Willow'],
        ['xpro2', ' X-pro II']
      ]
    }
  },

  ready () {
    document.addEventListener('click', event => {
      if (/demo__option-img/.test(event.target.className)) {
        this.pickSample(event.target)
      }
    }, false)
    this.pickSample(document.querySelector('.demo__option-img'))
  },

  methods: {
    inputFocus () {
      document.querySelector('input').select()
    },
    inputInput () {
        // wait for next tick
        // get the correct input value
      this.$nextTick(() => {
        this.updateImages(this.inputValue)
      })
    },

    pickSample (img) {
      this.updateImages(img.src)
      this.inputValue = img.getAttribute('src')
    },
    updateImages (src) {
      var imgs = document.querySelectorAll('.demo__item img')
      for (var i = 0; i < imgs.length; i++) imgs[i].src = src
    },
    snapshot () {
      var canvas = window.canvas
      canvas.getContext('2d').drawImage(window.video, 0, 0, canvas.width,
        canvas.height)
      this.updateImages(canvas.toDataURL())
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
      document.querySelector('.video-container').style.maxHeight = '420px'

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
            var vid = document.getElementById('camera-stream')

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
      window.video = document.querySelector('video')
      var canvas = window.canvas = document.querySelector('canvas')
      canvas.width = 480
      canvas.height = 360
    }
  }
}
</script>

<style>

</style>
