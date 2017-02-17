import React, {PropTypes} from 'react'
const Route = (props, context) => {
  // get state from context
  const state = context.store
  const visible = (state.router.pathname === props.route) && (props.visible ? props.visible(state) : true)

  // only for authenticated users
  if (!visible) {
    return <div />
  }
  // render page
  return props.component(undefined, context) || <div />
}

Route.propTypes = {
  // visibility function
  visible: PropTypes.func,
  // component
  component: PropTypes.func,
  // page route pathname
  route: PropTypes.string.isRequired
}

Route.contextTypes = {
  store: PropTypes.object.isRequired
}
export default Route
