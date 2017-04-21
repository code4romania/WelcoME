import React from 'react'
import { storiesOf } from '@kadira/storybook'
import {muiTheme} from 'storybook-addon-material-ui'

// Import some examples from material-ui
import NotAuthApp from './NotAuthApp'

storiesOf('core.Application', module)
// Add the `muiTheme` decorator to provide material-ui support to your stories.
// If you do not specify any arguments it starts with two default themes
// You can also configure `muiTheme` as a global decorator.
    .addDecorator(muiTheme())

    .addWithInfo('NotAuthApp',
  `
      Layout for not authenticated users
      ~~~js
        Landing: /
        SignIn : /signin
        SignUp : /signup
        Forgot : /forgot
        ResetPassword : /resetPassword
      ~~~
    `, () => (
      <NotAuthApp />
        ),
  { inline: true, propTables: [NotAuthApp] })
