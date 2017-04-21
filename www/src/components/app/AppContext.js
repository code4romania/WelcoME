import React from 'react'
import PropTypes from 'prop-types'
import App from './App.js'

const AppContext = (props, context) => {
  /* const state = context.store || {
    auth: {}
  } */

  return <App />
}

AppContext.contextTypes = {
  store: PropTypes.object
}

export default AppContext
