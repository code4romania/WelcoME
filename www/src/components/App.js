import React, {PropTypes} from 'react'
import Header from './header/Header.js'
import Page from './page/Page'
import Footer from './footer/Footer'
import LoadingApp from './LoadingApp'
import Toastr from './toastr/Toastr'
import './App.css'
const App = (props, context) => {
  if (context.store.auth.loading) {
    return <LoadingApp />
  }
  return (
    <div>
      <Header />
      <Page />
      <Footer />
      <Toastr timeOut={150000} />
    </div>
  )
}
App.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}

export default App
