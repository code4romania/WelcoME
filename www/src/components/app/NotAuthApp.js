import React from 'react'
import TitleCard from '../header/TitleCard'
import Menu from '../header/Menu'

const NotAuthApp = ({title, links}) => {
  return (
    <div>
      <TitleCard title={title} />
      <Menu links={links} />
    </div>
  )
}

export default NotAuthApp
