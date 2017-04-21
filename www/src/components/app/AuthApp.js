import React from 'react'
/* import Header from '../header/Header.js'
import Page from '../page/Page'
import Footer from '../footer/Footer'
import LoadingApp from './LoadingApp'
import Toastr from '../toastr/Toastr' */

const AuthApp = ({auth}) => {
  if (auth) {
    return <div> Auth 1 </div>
  } else {
    return <div> NotAuth </div>
  }
  /* if (!state.auth.loaded) {
    return <LoadingApp />
  }
  return (
    <div>
      <Header />
      <Page />
      <Footer />
      <Toastr />
    </div>
  ) */
}

export default AuthApp
