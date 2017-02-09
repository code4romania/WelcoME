import React from 'react'
import { render } from 'react-dom'
import stores$ from './stores'
import App from './components/app/App'
import initialState from './stores/initial'
import Provider from './rxdux/Provider'
import './index.css'

const mainContainer = document.getElementById('app')
stores$.debounceTime(16).startWith(initialState).subscribe(store => {
  console.log(store)
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    mainContainer
  )
})
// render main component
