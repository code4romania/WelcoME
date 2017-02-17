import ReactTransitionEvents from 'react/lib/ReactTransitionEvents'

export function onCSSTransitionEnd (node, callback) {
  const runOnce = (e) => {
    // stopPropagation is not working in IE11 and Edge, the transitionend from the Button.js is waiting
    // on the confirm animation to end first and not the Button.js
    e.stopPropagation()
    callback && callback(e)
    ReactTransitionEvents.removeEndEventListener(node, runOnce)
  }
  ReactTransitionEvents.addEndEventListener(node, runOnce)
}

export function _bind (strinOrAray, scope) {
  let array = strinOrAray
  if (!Array.isArray(strinOrAray)) {
    array = strinOrAray.split(' ')
  }
  return array.forEach(item => { scope[item] = scope[item].bind(scope) })
}
