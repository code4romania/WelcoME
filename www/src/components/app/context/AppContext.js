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

  const isAuth = state => {
    return !!state.auth;
  }

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

  const getAppContext = state => {
    return !state.auth || !state.auth.uid
      ? getNotAuthContext(state)
      : getAuthContext(state);
  }

  return !state.auth.appLoaded
    ? (<App
        loaded={false}
        logo={{}}
        leftLinks={[]}
        rightLinks={[]}
        pages={[]} />)
    : (
        <div>
          {getAppContext(state)}
        </div>
      );
}

AppContext.contextTypes = {
  store: PropTypes.object
}

export default AppContext
