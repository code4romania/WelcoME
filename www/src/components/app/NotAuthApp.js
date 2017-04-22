import React from 'react'
import TitleCard from '../header/TitleCard'
import LinearProgress from 'react-md/lib/Progress/LinearProgress'
import Menu from '../header/Menu'
import Pages from '../pages/Pages'
import './NotAuthApp.css'

const NotAuthApp = ({logo, links, pages, loaded}) => {
  const {title, action} = logo
  return (
    <div>
      <TitleCard title={title} action={action} />
      {!loaded ? <LinearProgress id='progress-auth' className='progress-auth' /> : null}
      <div className='notauth-div'>
        <Menu links={links} />
      </div>
      <Pages pages={pages} />

    </div>
  )
}

export default NotAuthApp
