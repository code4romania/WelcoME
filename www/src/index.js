import React from 'react'
import { render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { store$, handlers } from './store'
import Provider from './rxdux/Provider'
import AppContext from './components/app/AppContext'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import './index.css'

injectTapEventPlugin()

// inject state and handlers into context of React components
store$.subscribe(store => render(
  <Provider store={store} handlers={handlers}>
    <MuiThemeProvider muiTheme={getMuiTheme({
      fontFamily: 'Roboto'
    })}>
      <AppContext />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
))
