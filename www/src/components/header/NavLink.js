import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-md/lib/Buttons'
import './NavLink.css'

const NavLink = (props) => {
  return (props.visible
    ? <Button flat
      className={props.active ? 'active-link' : 'inactive-link'}
      onClick={props.action}
      label={props.text} />
    : null)
}

NavLink.propTypes = {
  visible: PropTypes.bool,
  active: PropTypes.bool,
  text: PropTypes.string.isRequired,
  action: PropTypes.func
}

export default NavLink
