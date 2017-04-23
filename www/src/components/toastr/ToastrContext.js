import React from 'react'
import Toastr from './Toastr'
import PropTypes from 'prop-types'

const ToastrContext = (p, context) => {
  const state = context.store
  const handlers = context.handlers
  return <Toastr toastrs={state.toastrs} removeToastr={handlers.removeToastr} />
}
ToastrContext.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}

export default ToastrContext
