import { videoDataURL, takeUserMedia } from 'src/api'

describe('src/api', () => {
  it('videoDataURL', () => {
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    const url = videoDataURL(canvas)

    // fixme: wtf? 'base64'??
    // expect(url).to.equal(
    //   'data:image/png;/Users/fritx/dev/FEbps/CSSgram-Vuex/test/unit64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAEElEQVQIHQEFAPr/AAAAAAAABQABuokQigAAAABJRU5ErkJggg=='
    // )
    expect(url).to.have.string(
      '64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAEElEQVQIHQEFAPr/AAAAAAAABQABuokQigAAAABJRU5ErkJggg=='
    )
  })

  // fixme: stub or mock? - http://sinonjs.org/docs/
  it('takeUserMedia: success', done => {
    const _getUserMedia = navigator.getUserMedia
    navigator.getUserMedia = sinon.stub() // stub
      .callsArgWithAsync(1, 'foo')
    const _createObjectURL = window.URL.createObjectURL
    window.URL.createObjectURL = a => a

    const video = {}
    takeUserMedia(video)
    setTimeout(() => {
      expect(video.src).to.equal('foo')
      navigator.getUserMedia = _getUserMedia // restore
      window.URL.createObjectURL = _createObjectURL
      done()
    }, 1000)
  })

  it('takeUserMedia: fail', done => {
    const _getUserMedia = navigator.getUserMedia
    navigator.getUserMedia = sinon.stub() // stub
      .callsArgWithAsync(2, new Error('bar'))
    const _log = console.log
    console.log = sinon.spy() // spy

    const video = {}
    takeUserMedia(video)
    setTimeout(() => {
      expect(console.log).to.be.calledWithMatch('getUserMedia: Error: bar')
      navigator.getUserMedia = _getUserMedia // restore
      console.log = _log
      done()
    }, 1000)
  })

  it('takeUserMedia: not supported', done => {
    const _getUserMedia = navigator.getUserMedia
    navigator.getUserMedia = null
    const _alert = window.alert
    window.alert = sinon.spy() // spy

    const video = {}
    takeUserMedia(video)
    setTimeout(() => {
      expect(window.alert).to.be.calledWithMatch('does not support')
      navigator.getUserMedia = _getUserMedia // restore
      window.alert = _alert
      done()
    }, 1000)
  })
})
