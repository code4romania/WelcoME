import React from 'react'
import { render } from 'react-dom'

import { store$, handlers } from './store'
import Provider from './rxdux/Provider'
import App from './components/App'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

injectTapEventPlugin()
it('renders without crashing', () => {
  const div = document.createElement('div')
  store$.subscribe(store => render(
    <Provider store={store} handlers={handlers}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <App />
      </MuiThemeProvider>
    </Provider>, div))
})
