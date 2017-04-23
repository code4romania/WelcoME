import React from 'react'
import { render } from 'react-dom'

import { store$, handlers } from './store'
import Provider from './rxdux/Provider'
import AppContext from './components/app/context/AppContext'
import 'react-md/dist/react-md.light_blue-deep_orange.min.css'
import './index.css'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

// inject state and handlers into context of React components
store$.subscribe(store => render(
  <Provider store={store} handlers={handlers}>
    <AppContext />
  </Provider>,
  document.getElementById('app')
))
