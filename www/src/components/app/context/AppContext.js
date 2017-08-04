import React from 'react'
import PropTypes from 'prop-types'
import App from '../App.js'
import NotAuthAppContext from './NotAuthAppContext'
import AuthAppContext from './AuthAppContext'
import AdminAppContext from './AdminAppContext'
import PendingAuthAppContext from './PendingAuthAppContext'

// This is the main app entrypoint
const AppContext = (props, context) => {
  const state = context.store;

  const getNotAuthContext = state => {
    return (
      <NotAuthAppContext />
    );
  }

  const getAuthContext = state => {
    if (state.auth.type === 'pending') {
      return (
        <PendingAuthAppContext />
      );
    }
    if (state.auth.type === 'admin') {
      return (
        <AdminAppContext />
      );
    }

    return (
      <AuthAppContext />
    );
  }

  let appContext = !!state.auth && !!state.auth.type
    ? getAuthContext(state)
    : getNotAuthContext(state);

  return !state.auth.appLoaded
    ? (<App
        loaded={false}
        logo={{}}
        leftLinks={[]}
        rightLinks={[]}
        pages={[]} />)
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
