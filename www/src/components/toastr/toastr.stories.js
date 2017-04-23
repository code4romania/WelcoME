import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, text, boolean } from '@kadira/storybook-addon-knobs'
import Toastr from './Toastr'

storiesOf('toastr.Toastr', module)
  .addDecorator(withKnobs)
  .add('Toastr', () => {
    const toastrs = [{
      id: 1,
      message: text('Message', 'Example text on toastr'),
      type: text('Type', 'success'),
      options: {
        showCloseButton: boolean('Show close', true)
      },
      title: text('Text', 'WelcoME')
    }]
    return (
      <Toastr toastrs={toastrs} removeToastr={action('Toastr removed')} />
    )
  })
