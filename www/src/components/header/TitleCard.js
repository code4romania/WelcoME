import React from 'react'
import { CardTitle } from 'react-md/lib/Cards'
import imgSrc from '../../../public/media/header/main.jpg'
import './TitleCard.css'

const TitleCard = ({title}) => {
  return (
    <div className='container-logo'>
      <img className='imgLogo' src={imgSrc} alt='logo' />
      <CardTitle className='titleCard' title={title} />
    </div>
  )
}
export default TitleCard
 