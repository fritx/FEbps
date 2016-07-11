// https://github.com/vuejs/vue/blob/dev/test/unit/specs/directives/public/model_spec.js
export function trigger (target, event, process) {
  var e = document.createEvent('HTMLEvents')
  e.initEvent(event, true, true)
  if (process) process(e)
  target.dispatchEvent(e)
}
