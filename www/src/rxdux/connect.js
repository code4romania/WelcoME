//

import { default as React, Component, PropTypes } from 'react'

const connect = (selector = state => state) => WrappedComponent => {
  class Connect extends Component {
    componentWillMount () {
      this.subscription = this
        .context
        .state$
        .map(selector)
        .subscribe(this.setState.bind(this))
    }

    componentWillUnmount () {
      this
        .subscription
        .unsubscribe()
    }

    render () {
      return (<WrappedComponent {...this.state} {...this.props} />)
    }
  }
  Connect.contextTypes = {
    state$: PropTypes.object.isRequired
  }
  Connect.displayName = 'Connect'
}

export default connect
