import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, text, boolean, number } from '@kadira/storybook-addon-knobs'
import centered from '@kadira/react-storybook-decorator-centered'
import TitleCard from './TitleCard'
import Menu from './Menu'
import NavLink from './NavLink'

storiesOf('header.TitleCard', module)
  .addDecorator(withKnobs)
  .add('TitleCard', () => {
    const title = text('Text', 'WelcoME')
    return (
      <TitleCard title={title} />
    )
  })

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

storiesOf('header.Menu', module)
  .addDecorator(withKnobs)
  .add('Menu', () => {
    const active = number('Active Element', 2)
    const links = Array.from(Array(number('Elements', 7)).keys()).map(el => ({
      key: el,
      text: `Link ${el + 1}`,
      visible: true,
      active: (el + 1) === active,
      action: action(`Clicked ${el + 1}`)
    }))
    return (
      <Menu links={links} />
    )
  })
