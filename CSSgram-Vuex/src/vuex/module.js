// mutation-types
const INPUT_CHANGE = 'INPUT_CHANGE'
const SAMPLE_PICK = 'SAMPLE_PICK'
const SNAPSHOT_DONE = 'SNAPSHOT_DONE'

// state
const state = {
  inputValue: '',
  imageSrc: null
}
// mutations
// note: (prevState, payload) => nextState
// https://github.com/vuejs/vuex/issues/246
const mutations = {
  [INPUT_CHANGE] (state, value) {
    state.inputValue = value
    state.imageSrc = value
  },
  [SAMPLE_PICK] (state, src) {
    state.inputValue = src
    state.imageSrc = src
  },
  [SNAPSHOT_DONE] (state, dataurl) {
    state.imageSrc = dataurl
  }
}
export { state, mutations }

// actions
export function inputChange ({ dispatch }, value) {
  dispatch(INPUT_CHANGE, value)
}
export function samplePick ({ dispatch }, img) {
  const src = img.getAttribute('src')
  dispatch(SAMPLE_PICK, src)
}
export function snapshotDone ({ dispatch }, dataurl) {
  dispatch(SNAPSHOT_DONE, dataurl)
}
