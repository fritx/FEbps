import * as api from 'src/api'
import { createStore } from 'src/vuex/store'
import {
  samplePick, inputChange, takePhoto, snapshot
} from 'src/vuex/mutations'

describe('src/vuex/mutations', () => {
  const store = createStore()
  let state
  beforeEach(() => {
    state = store.state
  })

  it('initial state', () => {
    expect(state).to.deep.equal({
      showCamera: false,
      inputValue: '',
      imageSrc: null
    })
  })

  it('samplePick', () => {
    testSamplePick('foo.jpg')
  })

  it('inputChange', () => {
    inputChange(store, 'bar.png')
    expect(state).to.deep.equal({
      showCamera: false,
      inputValue: 'bar.png',
      imageSrc: 'bar.png'
    })
  })

  it('takePhoto', () => {
    const _takeUserMedia = api.takeUserMedia
    api.takeUserMedia = sinon.spy() // spy
    const video = document.createElement('video')
    takePhoto(store, video)

    expect(api.takeUserMedia).to.be.calledWith(video)
    expect(state).to.deep.equal({
      showCamera: true,
      inputValue: 'bar.png',
      imageSrc: 'bar.png'
    })
    api.takeUserMedia = _takeUserMedia // restore
  })

  it('snapshot', () => {
    testSnapshot('data:image/png;base64,baz')
  })

  it('inputChange should turn off `showCamera`', () => {
    inputChange(store, 'foo.jpg')
    expect(state.showCamera).to.be.false
  })

  it('samplePick should turn off `showCamera`', () => {
    testSnapshot('data:image/png;base64,yay')
    testSamplePick('baz.jpg')
    expect(state.showCamera).to.be.false
  })

  function testSamplePick (src) {
    const img = document.createElement('img')
    img.setAttribute('src', src)
    samplePick(store, img)

    expect(state).to.deep.equal({
      showCamera: false,
      inputValue: src,
      imageSrc: src
    })
  }

  function testSnapshot (dataURL) {
    const { showCamera, inputValue } = state
    const _videoDataURL = api.videoDataURL
    const video = document.createElement('video')
    video._dataURL = dataURL
    api.videoDataURL = a => a._dataURL // spy
    snapshot(store, video)

    expect(state).to.deep.equal({
      showCamera,
      inputValue,
      imageSrc: dataURL
    })
    api.videoDataURL = _videoDataURL // restore
  }
})
