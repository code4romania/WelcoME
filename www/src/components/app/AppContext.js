import React from 'react'
import PropTypes from 'prop-types'
import AuthApp from './AuthApp.js'
import NotAuthApp from './NotAuthApp.js'
import Toastr from '../toastr/Toastr'
const AppContext = (props, context) => {
  const { auth } = context.store
  return (
    <div>
      { auth.uid ? <AuthApp /> : <NotAuthApp /> }
      <Toastr />
    </div>
  )
}

AppContext.contextTypes = {
  store: PropTypes.object
}

export default AppContext
