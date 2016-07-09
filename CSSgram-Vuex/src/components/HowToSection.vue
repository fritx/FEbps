<template>
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
</template>
