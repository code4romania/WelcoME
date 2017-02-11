import React, {PropTypes} from 'react'
let key = 0
const Link = (props, context) => {
  const handlers = context.handlers
  const state = context.store
  const onClick = event => {
    event.preventDefault()
    handlers.goToPath(props.go)
  }
  if (props.auth && !state.auth.authenticated) {
    return <div />
  }
  if (props.notAuth && state.auth.authenticated) {
    return <div />
  }
  if (props.simple) {
    return (
      <a href className={props.className} onClick={onClick}>
        {props.children}
      </a>
    )
  }
  return (
    <li className={`${props.liClassName} ${state.router.pathname === props.go ? 'active' : ''}`} key={key++}>
      <a href className={props.className} onClick={onClick}>
        {props.children}
      </a>
    </li>
  )
}

Link.propTypes = {
  auth: PropTypes.bool,
  go: PropTypes.string.isRequired,
  className: PropTypes.string,
  liClassName: PropTypes.string,
  simple: PropTypes.bool
}

Link.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}
export default Link
