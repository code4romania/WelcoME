import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, text, number } from '@kadira/storybook-addon-knobs'
import centered from '@kadira/react-storybook-decorator-centered'

import Example from './Example'

storiesOf('forms.Example', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .add('Example', () => {
    const className = text('Class', 'magic')
    const num = number('Number', 8)
    return (
      <Example className={className} action={action('Cliked')} num={num} />
    )
  })
