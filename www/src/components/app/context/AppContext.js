import React from 'react'
import PropTypes from 'prop-types'
import LoadingBar from '../../header/LoadingBar'
import NotAuthAppContext from './NotAuthAppContext'
import AuthAppContext from './AuthAppContext'
import AdminAppContext from './AdminAppContext'

// This is the main app entrypoint
const AppContext = (props, context) => {
  const state = context.store;

  let appContext = !state.auth || !state.auth.uid
    ? <NotAuthAppContext />
    : state.auth.type !== 'admin'
      ? <AuthAppContext />
      : <AdminAppContext />;

  return !state.auth.appLoaded
    ? (<LoadingBar />)
    : (
        <div>
          {appContext}
        </div>
      );    
}

AppContext.contextTypes = {
  store: PropTypes.object
}

export default AppContext
