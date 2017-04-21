import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import {muiTheme} from 'storybook-addon-material-ui'
import { withKnobs, text, boolean } from '@kadira/storybook-addon-knobs'
import TitleCard from './TitleCard'
import NavLink from './NavLink'

storiesOf('header.TitleCard', module)
  .addDecorator(muiTheme())
  .add('TitleCard', () => (
    <TitleCard />
  ))

storiesOf('header.NavLink', module)
  .addDecorator(muiTheme())
  .addDecorator(withKnobs)
  .add('NavLink', () => {
    const visible = boolean('Visible', true)
    const active = boolean('Active', true)
    const title = text('Text', 'Test')
    return (
      <NavLink action={action('button-click')} visible={visible} active={active} text={title} />
    )
  }, { inline: true, propTables: [NavLink] })
