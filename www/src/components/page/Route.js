import React, {PropTypes} from 'react'
const Route = (props, context) => {
  const state = context.store
  if (props.auth && !state.auth.authenticated && (state.router.pathname !== '/login')) {
    return <div />
  }
  if (props.notAuth && state.auth.authenticated && (state.router.pathname !== '/')) {
    return <div />
  }
  if (props.to !== '*' && (state.router.pathname !== props.to)) {
    return <div />
  }
  return props.children || <div />
}

Route.propTypes = {
  auth: PropTypes.bool,
  to: PropTypes.string.isRequired
}

Route.contextTypes = {
  store: PropTypes.object.isRequired
}
export default Route
