import Vue from 'vue'
import Vuex from 'vuex'
import DemoSection from 'src/components/DemoSection'
import { createStore } from 'src/vuex/store'
import { trigger } from '../utils'

Vue.use(Vuex)

describe('DemoSection.vue', () => {
  let wrap, vm, camera, button, input  // reference

  before(() => {
    wrap = new Vue({
      store: createStore(),
      template: `
        <div>
          <demo-section v-ref:vm></demo-section>
        </div>
      `,
      components: { DemoSection }
    }).$mount()
  })
  beforeEach(() => {
    vm = wrap.$refs.vm
    camera = vm.$el.querySelector('.video-container')
    button = vm.$el.querySelector('button')
    input = vm.$el.querySelector('input')
  })

  it('should render correct contents', () => {
    expect(vm.$el.querySelector('fieldset.demo__option-field'))
    expect(vm.$el.querySelector('small.demo__note'))
    expect(vm.$el.querySelector('ul.demo__list'))
    expect(camera)
    expect(camera.style.display).to.equal('none')
  })

  it('should handle event img@click', () => {
    const img = vm.$el.querySelector('.demo__option-img')
    const _samplePick = vm.samplePick
    vm.samplePick = sinon.spy() // spy
    trigger(img, 'click') // trigger

    expect(vm.samplePick).to.be.calledWith(img)
    vm.samplePick = _samplePick // restore
  })

  it('should handle event button@click', () => {
    const _$broadcast = vm.$broadcast
    vm.$broadcast = sinon.spy() // spy
    trigger(button, 'click') // trigger

    expect(vm.$broadcast).to.be.calledWith('take-photo')
    vm.$broadcast = _$broadcast // restore
  })

  it('should handle event input@focus', () => {
    const _select = input.select
    input.select = sinon.spy() // spy
    trigger(input, 'focus') // trigger

    expect(input.select).to.be.calledOnce
    input.select = _select // restore
  })

  it('should handle event input@input', done => {
    const _inputChange = vm.inputChange
    vm.inputChange = sinon.spy() // spy
    trigger(input, 'input') // trigger
    input.value = 'foo'

    Vue.nextTick(() => {
      expect(vm.inputChange).to.be.calledWith(input.value)
      vm.inputChange = _inputChange // restore
      done()
    })
  })
})
