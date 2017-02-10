import React from 'react'
import Header from './Header'
import Router from './Router'
import './App.css'

const App = (props) => (
  <div>
    <Header {...props} />
    <Router {...props} />
  </div>
)
export default App
