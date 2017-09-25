import React from 'react'
import PropTypes from 'prop-types'
import App from '../App.js'
import StepperContext from '../../pages/profile_creation/context/StepperContext'

// This is the main app entrypoint
const PendingAuthAppContext = (props, context) => {
  const state = context.store;
  const loaded = state.auth.loaded;

  return !loaded
    ? (<App
        loaded={false}
        logo={{}}
        leftLinks={[]}
        rightLinks={[]}
        pages={[]} />)
    : <StepperContext />;
}

PendingAuthAppContext.contextTypes = {
  store: PropTypes.object,
  handlers: PropTypes.object.isRequired
}

export default PendingAuthAppContext
