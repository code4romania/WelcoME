import React from 'react'
import Header from './Header'
import Home from './Home'
import Login from './Login'
import './App.css'
const router = (props) => {
  switch (props.router) {
    case '/':
      return <Home />
    case '/login':
      return <Login />
    default:
      return <Home />
  }
}
const App = (props) => (
  <div>
    <Header {...props} />
    {router(props)}
  </div>
)
export default App
