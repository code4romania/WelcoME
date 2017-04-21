import React from 'react'
import PropTypes from 'prop-types'
/* import Header from '../header/Header.js'
import Page from '../page/Page'
import Footer from '../footer/Footer'
import LoadingApp from './LoadingApp'
import Toastr from '../toastr/Toastr' */
import './App.css'

const App = ({auth}) => {
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

App.propTypes = {
  auth: PropTypes.bool.isRequired
}

export default App
