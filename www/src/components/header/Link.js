import React, {PropTypes} from 'react'

const Link = (props, context) => {
  // get state and handlers from context
  const handlers = context.handlers
  const state = context.store
  const visible = props.visible ? props.visible(state) : true
  const text = props.text || props.children
  // helpers
  const onClick = event => {
    event.preventDefault()
    props.route ? handlers.goToPath(props.route) : handlers[props.action]()
  }
  const activeRouteClass = state.router.pathname === props.route ? 'active' : ''

  // only for visible ones
  if (!visible) {
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
      <a href className={props.className} onClick={onClick}> {text} </a>
    </li>
  )
}

Link.propTypes = {
  // visibility function
  visible: PropTypes.func,
  // history navigate address
  route: PropTypes.string,
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
