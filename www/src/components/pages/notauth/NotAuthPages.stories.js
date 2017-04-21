import React from 'react'
import { storiesOf } from '@kadira/storybook'

import Home from './Home'

storiesOf('notAuthPages.Home', module)
  .add('LandingPage', () => {
    return (
      <Home />
    )
  })
