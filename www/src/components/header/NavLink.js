import React, {PropTypes} from 'react'
import FlatButton from 'material-ui/FlatButton'

import './NavLink.css'

const NavLink = (props, context) => {

  // get state and handlers from context
  const handlers = context.handlers;

  const state = context.store;

  const visible = props.visible ? props.visible(state) : true;

  const text = props.text || props.children;

  // helpers
  const onClick = event => {
    event.preventDefault();
    props.route ? handlers.goToPath(props.route) : handlers[props.action]();
  }

  const getClassName = () => {
    return state.router.pathname === props.route
      ? 'active-link'
      : 'inactive-link';
  }

  // only for visible ones
  if (!visible) {
    return null;
  }

  // li with a
  return (
    <FlatButton
      className={getClassName()}
      onClick={onClick}
      label={text} />
  );
}

NavLink.muiName = 'FlatButton'

NavLink.propTypes = {
  // visibility function
  visible: PropTypes.func,
  // history navigate address
  route: PropTypes.string,
  // action link handler name
  action: PropTypes.string
}

NavLink.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}

export default NavLink
