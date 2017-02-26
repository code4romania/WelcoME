import React from 'react'
import { render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { store$, handlers } from './store'
import Provider from './rxdux/Provider'
import App from './components/App'
import './index.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
injectTapEventPlugin()

// inject state and handlers into context of React components
store$.subscribe(store => render(
  <Provider store={store} handlers={handlers}>
    <MuiThemeProvider><App /></MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
))
