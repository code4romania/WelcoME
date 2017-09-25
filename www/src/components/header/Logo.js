import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-md/lib/Buttons/Button'
import './logo.css'

const Logo = ({clickLogo}) => {
  const contents =
    <Button
      className='nav-logo'
      onClick={clickLogo}
      flat>
      Welcome
    </Button>;

  return (
    <div>
      {contents}
    </div>
  );
}

Logo.PropTypes = {
  clickLogo: PropTypes.func,
}

export default Logo
