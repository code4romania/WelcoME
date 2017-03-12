import React, {PropTypes} from 'react'

class NavLink extends React.Component {

  // get state and handlers from context
  handlers = this.context.handlers;
  state = this.context.store
  visible = this.props.visible ? this.props.visible(state) : true
  text = this.props.text || this.props.children

  // helpers
  onClick = event => {
    event.preventDefault()
    this.props.route
      ? handlers.goToPath(this.props.route)
      : handlers[this.props.action]();
  }

  activeRouteClass = this.state.router.pathname === props.route
    ? 'active'
    : '';

  render() {
    // only for visible ones
    if (!this.visible) {
      return <div />;
    }

    return (
      <span>
        <a href className={this.props.className} onClick={this.onClick}>
          {props.children}
        </a>
      </span>
    );
  }
}

NavLink.propTypes = {
  // visibility function
  visible: PropTypes.func,
  // history navigate address
  route: PropTypes.string,
  // action link handler name
  action: PropTypes.string,
  // CSS class for a tag
  className: PropTypes.string,
}

NavLink.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}

export default NavLink
