import React, {PropTypes} from 'react'
const Route = (props, context) => {
  // get state from context
  const state = context.store

  // only for authenticated users
  if (props.auth && !state.auth.authenticated) {
    return <div />
  }

  // only for non-authenticated users
  if (props.notAuth && state.auth.authenticated) {
    return <div />
  }

  // tot current route or other routes
  if (props.to !== '*' && (state.router.pathname !== props.to)) {
    return <div />
  }

  // render page
  return props.children || <div />
}

Route.propTypes = {
  // only for authenticated users
  auth: PropTypes.bool,
  // only for non-authenticated users
  notAuth: PropTypes.bool,
  // page route pathname
  to: PropTypes.string.isRequired
}

Route.contextTypes = {
  store: PropTypes.object.isRequired
}
export default Route
