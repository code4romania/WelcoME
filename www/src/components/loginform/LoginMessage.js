import React, {PropTypes} from 'react'

const LoginMessage = ({ message }) => {
  if (message) {
    let className = 'alert alert-'
    if (message.isError) {
      className += 'danger'
    } else if (message.isWarning) {
      className += 'warning'
    } else {
      className += 'success'
    }

    return (
      <div className={`${className}`}>
        {message.message}
      </div>
    )
  }
  return <div />
}

LoginMessage.propTypes = {
  // message text
  message: PropTypes.string
}

export default LoginMessage
