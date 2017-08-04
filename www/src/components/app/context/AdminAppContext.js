import React from 'react'
import PropTypes from 'prop-types'
import ToastrContext from '../../toastr/ToastrContext'
import App from '../App.js'
import ProfileContext from '../../pages/auth/context/ProfileContext'
import AdminContext from '../../pages/auth/context/AdminContext'

const AdminAppContext = (props, context) => {
  const state = context.store;
  const handlers = context.handlers;
  const loaded = state.auth.loaded;

  const logo = {
    action: () => handlers.goToPath('/'),
  }

  const leftLinks = state => ([
    {
      key: 'admin-link',
      text: 'Admin',
      visible: !!state.auth.uid && (state.auth.type === 'admin'),
      action: () => handlers.goToPath('/admin'),
      active: state.router.pathname === '/admin'
    },
  ]);

  const rightLinks = state => ([
    {
      key: 'admin-profile-settings-link',
      icon: 'person_outline',
      text: 'Me',
      visible: !!state.auth.uid,
      isMenu: true,
      subLinks: [
        {
          key: 'admin-profile-link',
          text: 'Profile',
          visible: !!state.auth.uid,
          action: () => handlers.goToPath('/profile'),
          active: state.router.pathname === '/profile',
        }, {
          key: 'admin-sign-out-link',
          text: 'Log out',
          visible: !!state.auth.uid,
          action: () => handlers.requestSignout(),
          active: state.router.pathname === '/profile',
        },
      ],
    }
  ]);

  // All possible paths
  const pages = state => ([
    {
      key: 'admin-page',
      Page: AdminContext,
      visible: (state.auth.type === 'admin') && (state.router.pathname === '/admin')
    },
    {
      key: 'admin-profile-page',
      Page: ProfileContext,
      visible: !!state.auth.uid && state.router.pathname === '/profile'
    },
  ]);

  return !state.auth.appLoaded
    ? (<App
        loaded={false}
        logo={{}}
        leftLinks={[]}
        rightLinks={[]}
        pages={[]} />)
    : (<div>
        <App
          loaded={loaded}
          logo={logo}
          leftLinks={leftLinks(state)}
          rightLinks={rightLinks(state)}
          pages={pages(state)} />
        <ToastrContext />
      </div>);
}

AdminAppContext.contextTypes = {
  store: PropTypes.object,
  handlers: PropTypes.object.isRequired
}

export default AdminAppContext
