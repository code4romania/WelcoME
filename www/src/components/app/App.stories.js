import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, text, boolean, number } from '@kadira/storybook-addon-knobs'
import SignUp from '../pages/notauth/SignUp'
import Profile from '../pages/auth/Profile'
import NotAuthApp from './NotAuthApp'
import AuthApp from './AuthApp'
import LoadingApp from './LoadingApp'

storiesOf('core.Application', module)
  .addDecorator(withKnobs)

  // story for the non-authenticated state - sign-in / sign-up
  .add('NotAuthApp', () => {
    const loaded = boolean('Loaded', false);
    const logo = {
      title: text('Title', 'WelcoME'),
      action: action('clicked logo')
    };
    const active = number('Active Element', 2);
    const links = Array.from(Array(number('Elements', 2)).keys()).map(el => ({
      key: el,
      text: `Link ${el + 1}`,
      visible: true,
      active: (el + 1) === active,
      action: action(`Clicked ${el + 1}`)
    }));
    const email = {
      key: 'email',
      label: 'Email',
      value: 'test@gmail.com',
      error: 'Email not valid'
    };
    const password = {
      label: 'Password',
      value: 'TestPass1'
    };
    const passwordRepeat = {
      label: 'Repeat password',
      type: 'password',
      value: 'TestPass2',
      error: 'Passwords don\'t match'
    };
    const pages = [{
      key: 1,
      Page: () =>
        <SignUp
          loaded={loaded}
          email={email}
          password={password}
          passwordRepeat={passwordRepeat}
          enableSignUp={boolean('Enable', true)}
          requestSignUp={action('Request Email')}
          requestFacebook={action('Request Facebook')}
          requestGoogle={action('Request Google')}
          onChangeKey={(key, value) => action('Request Facebook', {[key]: value})}
        />,
      visible: boolean('Page Visible', true),
    }];

    return (
      <NotAuthApp loaded={loaded} logo={logo} links={links} pages={pages} />
    );
  })

  // story for the authenticated state - main app view - timeline, messages,
  // camps, etc..
  .add('AuthApp', () => {
    const active = number('Active Element', 2);
    const loaded = boolean('Loaded', false);
    const user = {
      username: text('Username', 'MARIO ROSSI'),
      clickProfile: action('Profile clicked'),
      clickSignout: action('Signed out')
    };
    const links = Array.from(Array(number('Elements', 4)).keys()).map(el => ({
      key: el,
      text: !el ? 'Home' : `Link ${el}`,
      visible: true,
      active: (el) === active,
      action: action(`Clicked ${el}`)
    }));
    const pages = [{
      key: 1,
      Page: Profile,
      visible: boolean('Page Visible', true)
    }];

    return (
      <AuthApp
        clickLogo={action('Clicked on logo')}
        links={links}
        pages={pages}
        loaded={loaded}
        user={user} />
    );
  })

  // story for the loading app state
  .add('LoadingApp', () => {
    return (
      <LoadingApp />
    )
  })
