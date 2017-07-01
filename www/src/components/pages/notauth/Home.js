import React from 'react'
import PropTypes from 'prop-types'
import imgSrc from '../../../../public/media/header/main.jpg'
import './Home.css'

const Home = ({action}) => {
  return (
    <div className='container-logo' onClick={action}>
      <img className='imgLogo' src={imgSrc} alt='logo' />
    </div>
  );
}

Home.propTypes = {
  action: PropTypes.func
}

export default Home
