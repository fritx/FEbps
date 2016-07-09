<template>
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
</template>
