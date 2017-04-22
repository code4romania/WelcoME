import React from 'react'
import PropTypes from 'prop-types'
import AuthAppContext from './AuthAppContext'
import NotAuthAppContext from './NotAuthAppContext'
import ToastrContext from '../../toastr/ToastrContext'

const AppContext = (props, context) => {
  const { auth } = context.store
  return (
    <div>
      { auth.uid ? <AuthAppContext /> : <NotAuthAppContext /> }
      <ToastrContext />
    </div>
  )
}

AppContext.contextTypes = {
  store: PropTypes.object
}

export default AppContext
