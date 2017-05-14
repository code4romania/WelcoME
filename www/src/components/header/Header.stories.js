import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, text, boolean, number } from '@kadira/storybook-addon-knobs'
import centered from '@kadira/react-storybook-decorator-centered'
import TitleCard from './TitleCard'
import Logo from './Logo'
import Menu from './Menu'
import Toolbar from './Toolbar'
import User from './User'
import NavLink from './NavLink'

storiesOf('header', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)

  .add('Logo', () => {
    return (
      <Logo clickLogo={action('Clicked on logo')} />
    );
  })

  .add('TitleCard', () => {
    const title = text('Text', 'WelcoME');
    return (
      <TitleCard title={title} />
    );
  })

  .add('User', () => {
    const username = text('Username', 'Toni Braxi');
    return (
      <User
        clickProfile={action('Clicked go profile')}
        clickSignout={action('Clicked signout')}
        username={username} />
    );
  })

  .add('Toolbar', () => {
    const user = {
      username: text('Username', 'MARIO ROSSI'),
      clickProfile: action('Profile clicked'),
      clickSignout: action('Signed out')
    };
    const active = number('Active Element', 2);
    const links = Array.from(Array(number('Elements', 3)).keys()).map(el => ({
      key: el,
      text: !el ? 'Home' : `Link ${el}`,
      visible: true,
      active: (el) === active,
      action: action(`Clicked ${el}`)
    }));

    return (
      <Toolbar
        links={links}
        user={user}
        clickLogo={action('Clicked on logo')} />
    );
  })

  .add('Menu', () => {
    const active = number('Active Element', 2);
    const links = Array.from(Array(number('Elements', 7)).keys()).map(el => ({
      key: el,
      text: `Link ${el + 1}`,
      visible: true,
      active: (el + 1) === active,
      action: action(`Clicked ${el + 1}`)
    }));

    return (
      <Menu links={links} />
    );
  })

  .addWithInfo('Navigation button - active', () => {
    const visible = boolean('Visible', true);
    const active = boolean('Active', true);
    const title = text('Text', 'Normal');

    return (
      <NavLink
        action={action('button-click')}
        visible={visible}
        active={active}
        text={title} />
    );
  }, { inline: true, propTables: [NavLink] })

  .addWithInfo('Navigation button - inactive', () => {
    const visible = boolean('Visible', true);
    const active = boolean('Active', false);
    const title = text('Text', 'Inactive');

    return (
      <NavLink
        action={action('button-click')}
        visible={visible}
        active={active}
        text={title} />
    );
  }, { inline: true, propTables: [NavLink] });
