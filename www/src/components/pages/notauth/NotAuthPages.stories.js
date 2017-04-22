import React from 'react'
import { storiesOf } from '@kadira/storybook'
import centered from '@kadira/react-storybook-decorator-centered'
import Home from './Home'
import SignUp from './SignUp'

storiesOf('notAuthPages', module)
  .addDecorator(centered)
  .add('LandingPage', () => {
    return (
      <Home />
    )
  })
  .add('SignUp', () => {
    return (
      <SignUp />
    )
  })
