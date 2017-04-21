import React from 'react'
// import TitleCard from '../header/TitleCard.js'
import NavLink from '../header/NavLink.js'
/* import Header from '../header/Header.js'
import Page from '../page/Page'
import Footer from '../footer/Footer'
import LoadingApp from './LoadingApp'
import Toastr from '../toastr/Toastr' */

const NotAuthApp = () => {
  return (
    <div>
      <NavLink visible active text='aaaa' action={() => console.log('cccc')} />
    </div>
  )
}

export default NotAuthApp
