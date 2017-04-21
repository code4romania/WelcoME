import React from 'react'
import { storiesOf } from '@kadira/storybook'
import {muiTheme} from 'storybook-addon-material-ui'

// Import some examples from material-ui
import App from './App'

storiesOf('core.Application', module)
// Add the `muiTheme` decorator to provide material-ui support to your stories.
// If you do not specify any arguments it starts with two default themes
// You can also configure `muiTheme` as a global decorator.
    .addDecorator(muiTheme())
    .addDecorator((story) => (
      <div style={{textAlign: 'center'}}>
        {story()}
      </div>
  ))
    .addWithInfo('App',
  `
      This is the basic usage with the button with providing a label to show the text.
      Since, the story source code is wrapped inside a div, info addon can't figure out propTypes on it's own.
      So, we need to give relevant React component classes manually using \`propTypes\` option as shown below:
      ~~~js
        text
      ~~~
    `, () => (
      <App />
        ),
  { inline: true, propTables: [App] })
