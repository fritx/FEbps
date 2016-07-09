<style>
  .demo__option-img {
    margin-left: 0.28em;
  }
</style>

<template>
  <div id="app">
    <section class="title-section">
      <img class="title--logo" src="assets/cssgram-logo.svg" alt="CSSgram">
      <h2 class="title--top-sub">A tiny (&lt;1kb gzipped!) library for recreating <a href="http://instagram.com">Instagram</a> filters with CSS filters and blend modes.</h2>
    </section>

    <demo-section></demo-section>
    <explanation-section></explanation-section>
    <how-to-section></how-to-section>

    <footer class="attribution">
      Made with love by <a href="http://twitter.com/una">Una</a>
      | <a href="http://github.com/una/CSSgram">View Source</a>
      <br>Adopted by <a href="https://github.com/fritx/FEbps">FEbps</a>
    </footer>
  </div>
</template>

<script>
import DemoSection from './components/DemoSection'
import ExplanationSection from './components/ExplanationSection'
import HowToSection from './components/HowToSection'

export default {
  components: {
    DemoSection,
    ExplanationSection,
    HowToSection
  }
}
</script>
