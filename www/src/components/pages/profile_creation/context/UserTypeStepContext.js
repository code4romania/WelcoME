import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import {Entities} from '../../../../store/constants'
import IStepContext from './IStepContext'
import UserTypeStep from '../UserTypeStep'

export default class UserTypeStepContext extends PureComponent {
  // Init the user type
  componentDidMount = () => {
    IStepContext(this.props, this.context)
      .onChangeKey('userType', Entities.userTypes.REFUGEE);
  }

  render = () => {
    // TODO - validation
    // const errors = {}

    const controls = {
      userTypes: [
        {
          value: Entities.userTypes.REFUGEE,
          label: 'Refugee',
        },
        {
          value: Entities.userTypes.ASYLUM_SEEKER,
          label: 'Asylum seeker',
        },
        {
          value: Entities.userTypes.VOLUNTEER,
          label: 'Volunteer',
        },
        {
          value: Entities.userTypes.COMMUNITY_HELPER,
          label: 'Community helper',
        },
      ]
    };

    return (
      <UserTypeStep
        {...IStepContext(this.props, this.context)}
        {...controls} />
    );
  }
}

UserTypeStepContext.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}
