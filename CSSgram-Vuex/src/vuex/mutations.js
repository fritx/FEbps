import { getUserMedia, videoDataURL } from '../api'

// mutation-types
const INPUT_CHANGE = 'INPUT_CHANGE'
const SAMPLE_PICK = 'SAMPLE_PICK'
const TAKE_PHOTO = 'TAKE_PHOTO'
const SNAPSHOT = 'SNAPSHOT'

// mutations
// note: (prevState, payload) => nextState
// https://github.com/vuejs/vuex/issues/246
export default {
  [INPUT_CHANGE] (state, value) {
    state.showCamera = false
    state.inputValue = value
    state.imageSrc = value
  },
  [SAMPLE_PICK] (state, src) {
    state.showCamera = false
    state.inputValue = src
    state.imageSrc = src
  },
  [TAKE_PHOTO] (state) {
    state.showCamera = true
  },
  [SNAPSHOT] (state, dataurl) {
    state.imageSrc = dataurl
  }
}

// actions
export function inputChange ({ dispatch }, value) {
  dispatch(INPUT_CHANGE, value)
}
export function samplePick ({ dispatch }, img) {
  const src = img.getAttribute('src')
  dispatch(SAMPLE_PICK, src)
}
export function takePhoto ({ dispatch }, video) {
  dispatch(TAKE_PHOTO)
  getUserMedia(video)
}
export function snapshot ({ dispatch }, video) {
  const dataurl = videoDataURL(video)
  dispatch(SNAPSHOT, dataurl)
}
