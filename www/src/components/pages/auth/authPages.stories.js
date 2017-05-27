import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, boolean, text } from '@kadira/storybook-addon-knobs'
import Profile from './Profile'

storiesOf('authPages.Profile', module)
  .addDecorator(withKnobs)
  .add('expanded', () => {
    // TODO: #1 stucture these types
    const profile = {
      accountLabel: 'Account',
      adminLabel: 'Administrator',
      refugeeLabel: 'Refugee',
      asylumLabel: 'Asylum Seeker',
      volunteerLabel: 'Volunteer',
      expanded: boolean('Expanded',true),
      editing: boolean('In edit',false),
      password: boolean('With password',true),
      facebook: boolean('With facebook',true),
      google: boolean('With google',false),
      admin: boolean('Administrator',false),
      refugee: boolean('Refugee',false),
      asylum: boolean('Asylum seeker',false),
      volunteer: boolean('Volunteer',false) ,
      onExpandToggle: action('Toggled expand'),
    };

    return (
       <Profile {...profile}/>
    );
  })
