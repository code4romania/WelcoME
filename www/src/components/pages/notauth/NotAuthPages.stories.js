import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, boolean } from '@kadira/storybook-addon-knobs'
import Home from './Home'
import SignUp from './SignUp'
import SignIn from './SignIn'
import Forgot from './Forgot'
import Reset from './Reset'
const email = {
  key: 'email',
  label: 'Email',
  value: 'aaa@gmail.co',
  error: 'Email not valid'
}
const password = {
  label: 'Password',
  value: 'TestPass1'
}
const passwordRepeat = {
  label: 'Repeat password',
  type: 'password',
  value: 'TestPass2',
  error: 'Passwords don\'t match'
}

storiesOf('notAuthPages', module)
  .addDecorator(withKnobs)
  .add('LandingPage', () => {
    return (
      <Home />
    )
  })
  .add('SignUp', () => {
    const loaded = boolean('Loaded', true)
    return (
      <SignUp
        loaded={loaded}
        email={email}
        password={password}
        passwordRepeat={passwordRepeat}
        enableSignUp={boolean('Enable SignUp', true)}
        requestSignUp={action('Request Sign Up Email')}
        requestFacebook={action('Request Facebook')}
        onChangeKey={action('Changed key')}
    />
    )
  })
  .add('SignIn', () => {
    const loaded = boolean('Loaded', true)
    return (
      <SignIn
        loaded={loaded}
        email={email}
        password={password}
        enableSignIn={boolean('Enable SignIn', true)}
        requestSignIn={action('Request Sign In Email')}
        goForgot={action('Go To Forgot ')}
        requestFacebook={action('Request Facebook')}
        onChangeKey={action('Changed key')}
    />
    )
  })
  .add('Forgot', () => {
    const loaded = boolean('Loaded', true)
    return (
      <Forgot
        loaded={loaded}
        email={email}
        enableForgot={boolean('Enable Forgot', true)}
        requestForgot={action('Request Forgot Email')}
        onChangeKey={action('Changed key')}
    />
    )
  })
  .add('Reset Password', () => {
    const loaded = boolean('Loaded', true)
    const password = {
      key: 'password',
      label: 'Password',
      value: 'SomePass1'
    }
    return (
      <Reset
        loaded={loaded}
        password={password}
        enableReset={boolean('Enable Reset', true)}
        requestReset={action('Request Reset Password')}
        onChangeKey={action('Changed key')}
    />
    )
  })
