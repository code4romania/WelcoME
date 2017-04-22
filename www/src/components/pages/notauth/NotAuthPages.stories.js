import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, text, boolean, number } from '@kadira/storybook-addon-knobs'
import Home from './Home'
import SignUp from './SignUp'
import SignIn from './SignIn'

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
    const password2 = {
      label: 'Repeat password',
      type: 'password',
      value: 'TestPass2',
      error: 'Passwords don\'t match'
    }
    return (
      <SignUp
        email={email}
        password={password}
        password2={password2}
        enableSignUpEmail={boolean('Enable', true)}
        signUpWithEmail={action('Request Email')}
        signUpWithFacebook={action('Request Facebook')}
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
        enableSignInEmail={boolean('Enable', true)}
        signInWithEmail={action('Sign In Email')}
        signInWithFacebook={action('Request Facebook')}
        onChangeKey={action('Changed key')}
    />
    )
  })
