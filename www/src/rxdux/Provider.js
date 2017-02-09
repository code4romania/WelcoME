// Provider injects store stream as props as context
// in order to let connect to have access to it

import React,{ Component, PropTypes, Children } from 'react'

export default class Provider extends Component {
  getChildContext () {
    console.log('aaaa',{store: this.props.store})
    return {store: this.props.store,pupa:'aaaa'}
  }

  constructor (props, context) {
    super(props, context)
    this.store = this.props.store
  }

  render () {
    return <div>{this.props.children}</div>
  }
}

Provider.propTypes = {
  store: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
}

Provider.childContextTypes = {
  store: PropTypes.object.isRequired,
  pupa: PropTypes.string.isRequired
}

Provider.displayName = 'Provider'
