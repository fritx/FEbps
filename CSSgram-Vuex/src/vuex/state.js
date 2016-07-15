// state
export function createState () {
  return {
    showCamera: false,
    inputValue: '',
    imageSrc: null
  }
}

// getters
export function showCamera (state) {
  return state.showCamera
}
export function inputValue (state) {
  return state.inputValue
}
export function imageSrc (state) {
  return state.imageSrc
}
