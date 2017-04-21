import React from 'react'
import Menu from '../header/Menu'
import Pages from '../pages/Pages'
import './AuthApp.css'

const AuthApp = ({links, pages}) => {
  return (
    <div>
      <div className='auth-div'>
        <Menu links={links} />
      </div>
      <Pages pages={pages} />
    </div>
  )
}

export default AuthApp
