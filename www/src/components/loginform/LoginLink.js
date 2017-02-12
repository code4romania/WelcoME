import React, { PropTypes } from 'react'

const LoginLink = (props, { handlers }) => (
  <a onClick={() => handlers.goToPath(props.goTo)}>{ props.text }</a>
)

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
