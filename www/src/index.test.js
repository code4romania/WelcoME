import React from 'react'
import { render } from 'react-dom'

import { store$, handlers } from './store'
import Provider from './rxdux/Provider'
import AppContext from './components/app/context/AppContext'
import injectTapEventPlugin from 'react-tap-event-plugin'
import 'react-md/dist/react-md.deep_purple-pink.min.css'
import './index.css'

injectTapEventPlugin()
it('renders without crashing', () => {
  const div = document.createElement('div')
  store$.subscribe(store => render(
    <Provider store={store} handlers={handlers}>
      <AppContext />
    </Provider>, div))
})
