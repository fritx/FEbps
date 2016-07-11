import Vue from 'vue'
import Vuex from 'vuex'
import store from 'src/vuex/store'
import { inputChange } from 'src/vuex/mutations'
import VideoContainer from 'src/components/VideoContainer'

Vue.use(Vuex)

describe('VideoContainer.vue', () => {
  let vm // reference
  before(() => {
    vm = new Vue({
      store,
      template: `
        <div>
          <video-container v-ref:camera></video-container>
        </div>
      `,
      components: { VideoContainer }
    }).$mount()
  })

  it('should render correct contents', () => {
    const video = vm.$el.querySelector('video')
    expect(video.getAttribute('width')).to.equal('480')
    expect(video.getAttribute('height')).to.equal('360')
    expect(video.getAttribute('autoplay')).to.equal('')

    const button = vm.$el.querySelector('button')
    expect(button.id).to.equal('snapshot')
    expect(button.textContent).to.equal('Use snapshot')
  })

  // question: does vm.$nectTick needed?
  // but $nectTick causes error:
  // `undefined is not a constructor (evaluating 'vm.$nickTick(function ()`
  it('should handle event `take-photo`', () => {
    const camera = vm.$refs.camera
    const video = camera.$el.querySelector('video')
    const _takePhoto = camera.takePhoto
    camera.takePhoto = sinon.spy() // spy
    vm.$broadcast('take-photo') // trigger
    expect(camera.takePhoto.calledWith(video)).to.be.true
    camera.takePhoto = _takePhoto // restore
  })

  it('should handle event #snaoshot@click', () => {
    const camera = vm.$refs.camera
    const video = camera.$el.querySelector('video')
    const button = camera.$el.querySelector('button')
    const _snapshot = camera.snapshot
    camera.snapshot = sinon.spy() // spy
    button.click() // trigger
    expect(camera.snapshot.calledWith(video)).to.be.true
    camera.snapshot = _snapshot // restore
  })

  // fixme: how to test getters (better)?
  // https://forum.vuejs.org/topic/3823/how-to-test-a-component-that-contains-vuex-getters/4
  it('should show/hide for `showCamera`', done => {
    const camera = vm.$refs.camera
    expect(camera.$el.style.display).to.equal('none')
    camera.takePhoto() // trigger
    Vue.nextTick(() => {
      // note: display === '' here, instead of 'block'
      expect(camera.$el.style.display).to.not.equal('none')
      inputChange(store, 'foo') // trigger
      Vue.nextTick(() => {
        expect(camera.$el.style.display).to.equal('none')
        done()
      })
    })
  })
})
