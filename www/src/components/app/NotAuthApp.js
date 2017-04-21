import React from 'react'
import TitleCard from '../header/TitleCard'
import Menu from '../header/Menu'
import Pages from '../pages/Pages'
import './NotAuthApp.css'

const NotAuthApp = ({title, links, pages}) => {
  return (
    <div>
      <TitleCard title={title} />
      <div className='notauth-div'>
        <Menu links={links} />
      </div>
      <Pages pages={pages} />
    </div>
  )
}

export default NotAuthApp
