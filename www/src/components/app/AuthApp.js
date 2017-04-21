import React from 'react'
import TitleCard from '../header/TitleCard'
import Menu from '../header/Menu'
import Pages from '../pages/Pages'
import './AuthApp.css'

const AuthApp = ({title, links, pages}) => {
  return (
    <div>
      <TitleCard title={title} />
      <div className='auth-div'>
        <Menu links={links} />
      </div>
      <Pages pages={pages} />
    </div>
  )
}

export default AuthApp
