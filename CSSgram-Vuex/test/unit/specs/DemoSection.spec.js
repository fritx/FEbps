import Vue from 'vue'
import Vuex from 'vuex'
import store from 'src/vuex/store'
import DemoSection from 'src/components/DemoSection'
import { trigger } from '../utils'

Vue.use(Vuex)

describe('DemoSection.vue', () => {
  let vm // reference
  before(() => {
    vm = new Vue({
      store,
      template: `
        <div>
          <demo-section v-ref:demo></demo-section>
        </div>
      `,
      components: { DemoSection }
    }).$mount()
  })

  it('should render correct contents', () => {
    const demo = vm.$el.querySelector('.demo__section')
    expect(demo.querySelector('fieldset.demo__option-field'))
    expect(demo.querySelector('small.demo__note'))
    expect(demo.querySelector('ul.demo__list'))

    const camera = demo.querySelector('.video-container')
    expect(camera.style.display).to.equal('none')
  })

  it('should handle event input@focus', () => {
    const demo = vm.$refs.demo
    const input = demo.$el.querySelector('input')
    const _select = input.select
    input.select = sinon.spy() // spy
    trigger(input, 'focus') // trigger
    expect(input.select.calledOnce).to.be.true
    input.select = _select // restore
  })

  it('should handle event input@input', done => {
    const demo = vm.$refs.demo
    const input = demo.$el.querySelector('input')
    const _inputChange = demo.inputChange
    demo.inputChange = sinon.spy() // spy
    trigger(input, 'input') // trigger
    input.value = 'foo'
    Vue.nextTick(() => {
      expect(demo.inputChange.calledWith(input.value)).to.be.true
      demo.inputChange = _inputChange // restore
      done()
    })
  })
})
