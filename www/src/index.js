import React from 'react'
import { render } from 'react-dom'

import { store$, handlers } from './store'
import Provider from './rxdux/Provider'
import AppContext from './components/app/AppContext'

import './index.css'

// inject state and handlers into context of React components
store$.subscribe(store => render(
  <Provider store={store} handlers={handlers}>
    <AppContext />
  </Provider>,
  document.getElementById('app')
))
