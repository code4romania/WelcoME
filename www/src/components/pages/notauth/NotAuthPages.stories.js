import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, boolean } from '@kadira/storybook-addon-knobs'
import Home from './Home'
import SignUp from './SignUp'
import SignIn from './SignIn'
import Forgot from './Forgot'
import Reset from './Reset'

storiesOf('notAuthPages', module)
  .addDecorator(withKnobs)
  .add('LandingPage', () => {
    return (
      <Home />
    )
  })
  .add('SignUp', () => {
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
    return (
      <SignUp
        email={email}
        password={password}
        passwordRepeat={passwordRepeat}
        enableSignUp={boolean('Enable', true)}
        requestSignUp={action('Request Sign Up Email')}
        requestFacebook={action('Request Facebook')}
        onChangeKey={action('Changed key')}
    />
    )
  })
  .add('SignIn', () => {
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
    return (
      <SignIn
        email={email}
        password={password}
        enableSignIn={boolean('Enable', true)}
        requestSignIn={action('Request Sign In Email')}
        goForgot={action('Go To Forgot ')}
        requestFacebook={action('Request Facebook')}
        onChangeKey={action('Changed key')}
    />
    )
  })
  .add('Forgot', () => {
    const email = {
      key: 'email',
      label: 'Email',
      value: 'aaa@gmail.co',
      error: 'Email not valid'
    }
    return (
      <Forgot
        email={email}
        enableForgot={boolean('Enable', true)}
        requestForgot={action('Request Forgot Email')}
        onChangeKey={action('Changed key')}
    />
    )
  })
  .add('Reset Password', () => {
    const password = {
      key: 'password',
      label: 'Password',
      value: 'SomePass1'
    }
    return (
      <Reset
        password={password}
        enableReset={boolean('Enable', true)}
        requestReset={action('Request Reset Password')}
        onChangeKey={action('Changed key')}
    />
    )
  })
