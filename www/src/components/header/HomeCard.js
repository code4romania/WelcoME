import React from 'react'
import PropTypes from 'prop-types'

import { CardTitle } from 'react-md/lib/Cards'
import imgSrc from '../../../public/media/header/main.jpg'
import './HomeCard.css'

const HomeCard = ({action}) => {
  return (
    <div className='container-logo' onClick={action}>
      <img className='imgLogo' src={imgSrc} alt='logo' />
    </div>
  );
}

HomeCard.propTypes = {
  action: PropTypes.func
}

export default HomeCard
