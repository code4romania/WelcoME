import React, {PropTypes} from 'react'

const Link = (props, context) => {
  // get state and handlers from context
  const handlers = context.handlers
  const state = context.store

  // helpers
  const onClick = event => {
    event.preventDefault()
    props.goTo ? handlers.goToPath(props.goTo) : handlers[props.action]()
  }
  const activeRouteClass = state.router.pathname === props.goTo ? 'active' : ''

  // only for authenticated users
  if (props.auth && !state.auth.authenticated) {
    return <div />
  }
  // only for non-authenticated users
  if (props.notAuth && state.auth.authenticated) {
    return <div />
  }

  // no li, only a
  if (props.simple) {
    return (
      <a href className={props.className} onClick={onClick}>
        {props.children}
      </a>
    )
  }

  // li with a
  return (
    <li className={`${props.liClassName} ${activeRouteClass}`}>
      <a href className={props.className} onClick={onClick}>
        {props.children}
      </a>
    </li>
  )
}

Link.propTypes = {
  // only for authenticated users
  auth: PropTypes.bool,
  // only for non-authenticated users
  notAuth: PropTypes.bool,
  // history navigate address
  goTo: PropTypes.string,
  // action link handler name
  action: PropTypes.string,
  // CSS class for a tag
  className: PropTypes.string,
  // CSS class for li tag
  liClassName: PropTypes.string,
  // only a tag without li tag
  simple: PropTypes.bool
}

Link.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}
export default Link
