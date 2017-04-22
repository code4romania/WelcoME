import React from 'react'
import Menu from '../header/Menu'
import Pages from '../pages/Pages'
import LinearProgress from 'react-md/lib/Progress/LinearProgress'
import './AuthApp.css'

const AuthApp = ({links, pages, loaded}) => {
  return (
    <div>
      {!loaded ? <LinearProgress id='progress-auth' className='progress-auth' /> : null}
      <div className='auth-div'>
        <Menu links={links} />
      </div>
      <Pages pages={pages} />
    </div>
  )
}

export default AuthApp
