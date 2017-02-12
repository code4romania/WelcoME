import React, {PropTypes} from 'react'

const LoginMessage = (props) => {
  if (props.message) {
    return (
      <div className={`${props.className}`}>
        {props.message}
      </div>
    )
  }
  return <div />
}

LoginMessage.propTypes = {
  // message text
  message: PropTypes.string,
  // CSS class
  className: PropTypes.string
}

export default LoginMessage
