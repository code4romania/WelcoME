import React, { PropTypes } from 'react'

import './LoginLink.css'

const LoginLink = (props, { handlers }) => {

  return (
    <a
      className='login-link'
      onClick={event => {
        event.preventDefault()
        handlers.goToPath(props.goTo)
      }}>
        { props.text }
    </a>
  );
}

LoginLink.propTypes = {
  // history navigate address
  goTo: PropTypes.string.isRequired,
  // text
  text: PropTypes.string.isRequired
}

LoginLink.contextTypes = {
  handlers: PropTypes.object.isRequired
}

export default LoginLink
