import React from 'react'
import { render } from 'react-dom'

import { store$ } from './rxdux'
import './reducers'
import './services'
import App from './components/App'
import './index.css'

if (process.env.NODE_ENV === 'development') {
  store$.subscribe(state => console.info('State', state))
  store$.subscribe(state => {
    global.State = state
  })
}

// render App with state observer subscribed to store stream
store$.subscribe(state => render(<App {...state} />, document.getElementById('app')))
