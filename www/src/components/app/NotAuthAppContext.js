import React from 'react'
import NotAuthApp from './NotAuthApp.js'

const NotAuthAppContext = () => {
  const title = 'WelcoME'
  const links = [{
    key: '1',
    text: 'aaaa',
    visible: true
  }, {
    key: '2',
    text: 'bbbb',
    active: true,
    visible: true
  }]
  return (
    <div>
      <NotAuthApp title={title} links={links} />
    </div>
  )
}

export default NotAuthAppContext
