import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, text, boolean, number } from '@kadira/storybook-addon-knobs'
import SignIn from '../pages/notauth/SignIn'
import Profile from '../pages/auth/Profile'
// Import some examples from material-ui
import NotAuthApp from './NotAuthApp'
import AuthApp from './AuthApp'

storiesOf('core.Application', module)
  .addDecorator(withKnobs)
  .add('NotAuthApp', () => {
    const logo = {
      title: text('Title', 'WelcoME'),
      action: action('clicked logo')
    }
    const active = number('Active Element', 2)
    const links = Array.from(Array(number('Elements', 7)).keys()).map(el => ({
      key: el,
      text: `Link ${el + 1}`,
      visible: true,
      active: (el + 1) === active,
      action: action(`Clicked ${el + 1}`)
    }))
    const pages = [{
      Page: SignIn,
      visible: boolean('Page Visible', true),
      props: {
        key: 1
      }
    }]
    return (
      <NotAuthApp logo={logo} links={links} pages={pages} />
    )
  })
  .add('AuthApp', () => {
    const active = number('Active Element', 2)
    const links = Array.from(Array(number('Elements', 7)).keys()).map(el => ({
      key: el,
      text: !el ? 'Home' : `Link ${el}`,
      visible: true,
      active: (el) === active,
      action: action(`Clicked ${el}`)
    }))
    const pages = [{
      Page: Profile,
      visible: boolean('Page Visible', true),
      props: {
        key: 1
      }
    }]
    return (
      <AuthApp links={links} pages={pages} />
    )
  })
