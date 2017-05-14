import React from 'react'
import PropTypes from 'prop-types'

import { CardTitle } from 'react-md/lib/Cards'
import imgSrc from '../../../public/media/header/main.jpg'
import './TitleCard.css'

const TitleCard = ({title, action}) => {
  return (
    <div className='container-logo' onClick={action}>
      <img className='imgLogo' src={imgSrc} alt='logo' />
      <CardTitle className='titleCard' title={title} />
    </div>
  );
}

TitleCard.propTypes = {
  title: PropTypes.string.isRequired,
  action: PropTypes.func
}

export default TitleCard
