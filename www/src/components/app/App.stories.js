import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, text, boolean, number } from '@kadira/storybook-addon-knobs'
import SignIn from '../pages/notauth/SignIn'
// Import some examples from material-ui
import NotAuthApp from './NotAuthApp'

storiesOf('core.Application', module)
  .addDecorator(withKnobs)
  .add('NotAuthApp', () => {
    const title = text('Title', 'WelcoME')
    const active = number('Active Element', 2)
    const links = Array.from(Array(number('Elements', 7)).keys()).map(el => ({
      key: el,
      text: `Link ${el + 1}`,
      visible: true,
      active: (el + 1) === active,
      action: action(`Clicked ${el + 1}`)
    }))
    const pages = [{
      key: 1,
      Page: SignIn,
      visible: boolean('Page Visible', true),
      props: {

      }
    }]
    return (
      <NotAuthApp title={title} links={links} pages={pages} />
    )
  })
