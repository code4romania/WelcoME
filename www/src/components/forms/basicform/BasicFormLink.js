import React, { PropTypes } from 'react'

import './BasicFormLink.css'

const BasicFormLink = (props, { handlers }) => {
  return (
    <a
      className='basic-form-link'
      onClick={event => {
        event.preventDefault()
        handlers.goToPath(props.goTo)
      }}>
      { props.text }
    </a>
  );
}

BasicFormLink.propTypes = {
  // history navigate address
  goTo: PropTypes.string.isRequired,
  // text
  text: PropTypes.string.isRequired
}

BasicFormLink.contextTypes = {
  handlers: PropTypes.object.isRequired
}

export default BasicFormLink
