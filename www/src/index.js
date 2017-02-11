import React from 'react'
import { render } from 'react-dom'
import stores$ from './stores'

import App from './components/App'
import './index.css'

if (process.env.NODE_ENV === 'development') {
  stores$.subscribe(state => console.info('State', state))
  stores$.subscribe(state => {
    global.State = state
  })
}
// render App with state observer subscribed to store stream
stores$.subscribe(state => render(<App {...state} />, document.getElementById('app')))
