import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, text, boolean } from '@kadira/storybook-addon-knobs'
import centered from '@kadira/react-storybook-decorator-centered'
import TitleCard from './TitleCard'
import NavLink from './NavLink'

storiesOf('header.TitleCard', module)
  .add('TitleCard', () => (
    <TitleCard />
  ))

storiesOf('header.NavLink', module)
  .addDecorator(withKnobs)
  .addWithInfo('description', `
    Navigation button
  `, () => {
    const visible = boolean('Visible', true)
    const active = boolean('Active', true)
    const title = text('Text', 'Normal')
    return (
      <NavLink action={action('button-click')} visible={visible} active={active} text={title} />
    )
  }, { inline: true, propTables: [NavLink] })

storiesOf('header.NavLink', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .add('normal', () => {
    const visible = boolean('Visible', true)
    const active = boolean('Active', false)
    const title = text('Text', 'Inactive')
    return (
      <NavLink action={action('button-click')} visible={visible} active={active} text={title} />
    )
  })
  .add('active', () => {
    const visible = boolean('Visible', true)
    const active = boolean('Active', true)
    const title = text('Text', 'Active')
    return (
      <NavLink action={action('button-click')} visible={visible} active={active} text={title} />
    )
  })
