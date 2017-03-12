import React, {PropTypes} from 'react'
import FlatButton from 'material-ui/FlatButton'

const styles = {
  flat: {
    color: '#ffffff',
    marginTop: 7
  }

}

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
    return null
  }
  // li with a
  return <FlatButton backgroundColor={activeRouteClass ? '#a4c639' : ''} style={styles.flat} onClick={onClick} label={text} />
}

Link.muiName = 'FlatButton'
Link.propTypes = {
  // visibility function
  visible: PropTypes.func,
  // history navigate address
  route: PropTypes.string,
  // action link handler name
  action: PropTypes.string
}

Link.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}
export default Link
