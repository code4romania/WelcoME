import React, {PropTypes} from 'react'

const LoginMessage = ({ message }) => {
  if (!message) {
    return null;
  }

  const getClassName = () => {
    let className = 'alert alert-'
    if (message.isError) {
      className += 'danger'
    } else if (message.isWarning) {
      className += 'warning'
    } else {
      className += 'success'
    }
    return className;
  }

  return (
    <div className={`${getClassName()}`}>
      {message.message}
    </div>
  );
}

LoginMessage.propTypes = {
  // message object
  message: PropTypes.object
}

export default LoginMessage
