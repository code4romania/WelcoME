import { Component, PropTypes, Children } from 'react'

export default class Provider extends Component {
  getChildContext () {
    return { store: this.props.store, handlers: this.props.handlers }
  }

  render () {
    return Children.only(this.props.children)
  }
}

Provider.propTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
}
Provider.childContextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}
Provider.displayName = 'Provider'
