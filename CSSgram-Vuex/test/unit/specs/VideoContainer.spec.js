import Vue from 'vue'
import Vuex from 'vuex'
import store from 'src/vuex/store'
import { inputChange } from 'src/vuex/mutations'
import VideoContainer from 'src/components/VideoContainer'

Vue.use(Vuex)

// fixme: '[Vue warn]: Unknown custom element: <video>
// - did you register the component correctly?
// For recursive components, make sure to provide the "name" option.'
describe('VideoContainer.vue', () => {
  let wrap, vm, video, button // reference

  before(() => {
    wrap = new Vue({
      store,
      template: `
        <div>
          <video-container v-ref:vm></video-container>
        </div>
      `,
      components: { VideoContainer }
    }).$mount()
  })
  beforeEach(() => {
    vm = wrap.$refs.vm
    video = vm.$el.querySelector('video')
    button = vm.$el.querySelector('button')
  })

  it('should render correct contents', () => {
    expect(video.getAttribute('width')).to.equal('480')
    expect(video.getAttribute('height')).to.equal('360')
    expect(video.getAttribute('autoplay')).to.equal('')
    expect(button.id).to.equal('snapshot')
    expect(button.textContent).to.equal('Use snapshot')
  })

  // question: does vm.$nectTick needed?
  // but $nectTick causes error:
  // `undefined is not a constructor (evaluating 'vm.$nickTick(function ()`
  it('should handle event `take-photo`', () => {
    const _takePhoto = vm.takePhoto
    vm.takePhoto = sinon.spy() // spy
    wrap.$broadcast('take-photo') // trigger

    expect(vm.takePhoto).to.be.calledWith(video)
    vm.takePhoto = _takePhoto // restore
  })

  it('should handle event #snapshot@click', () => {
    const _snapshot = vm.snapshot
    vm.snapshot = sinon.spy() // spy
    button.click() // trigger

    expect(vm.snapshot).to.be.calledWith(video)
    vm.snapshot = _snapshot // restore
  })

  // fixme: how to test getters (better)?
  // https://forum.vuejs.org/topic/3823/how-to-test-a-component-that-contains-vuex-getters/4
  it('should show/hide for `showCamera`', done => {
    expect(vm.$el.style.display).to.equal('none')
    vm.takePhoto() // trigger

    Vue.nextTick(() => {
      // note: display === '' here, instead of 'block'
      expect(vm.$el.style.display).to.not.equal('none')
      inputChange(store, 'foo') // trigger

      Vue.nextTick(() => {
        expect(vm.$el.style.display).to.equal('none')
        done()
      })
    })
  })
})
