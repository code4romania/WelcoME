import React from 'react'
import { render } from 'react-dom'

import { store$, handlers } from './store'
import Provider from './rxdux/Provider'
import App from './components/App'
import injectTapEventPlugin from 'react-tap-event-plugin'
import 'react-mdl/extra/material.css'
import 'react-mdl/extra/material.js'

injectTapEventPlugin()
it('renders without crashing', () => {
  const div = document.createElement('div')
  store$.subscribe(store => render(
    <Provider store={store} handlers={handlers}>
      <App />
    </Provider>, div))
})
