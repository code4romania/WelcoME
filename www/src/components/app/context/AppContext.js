import React from 'react'
import PropTypes from 'prop-types'
import AuthAppContext from './AuthAppContext'
import NotAuthAppContext from './NotAuthAppContext'
import ToastrContext from '../../toastr/ToastrContext'
import LoadingApp from '../LoadingApp'

// This is the main app entrypoint. Checks for auth state and launches the
// corresponding app contexts
const AppContext = (props, context) => {
  const { auth } = context.store;
  const appContext = auth.uid
    ? <AuthAppContext />
    : <NotAuthAppContext />;

  return !auth.appLoaded
    ? <LoadingApp />
    : <div>
        { appContext }
        <ToastrContext />
      </div>;
}

AppContext.contextTypes = {
  store: PropTypes.object
}

export default AppContext
