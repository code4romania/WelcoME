import React from 'react'
import { render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { store$, handlers } from './store'
import Provider from './rxdux/Provider'
import App from './components/App'
import './index.css'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {cyan500} from 'material-ui/styles/colors';

injectTapEventPlugin()

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
const muiTheme = getMuiTheme({
  fontFamily: 'Roboto',
});

// inject state and handlers into context of React components
store$.subscribe(store => render(
  <Provider store={store} handlers={handlers}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
))
