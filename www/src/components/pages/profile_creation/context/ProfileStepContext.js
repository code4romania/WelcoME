import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import ProfileCreationStep from '../ProfileCreationStep'
import IStepContext from './IStepContext'
import { nationalities } from '../../../utils'

export default class ProfileStepContext extends PureComponent {

  componentDidMount = () => {
    // Init email
    if (!!this.context.store.auth && !!this.context.store.auth.email) {
      IStepContext(this.props, this.context)
        .onChangeKey('email', this.context.store.auth.email);
    }
    // radio defaults
    IStepContext(this.props, this.context).onChangeKey('gender', 'male');
    IStepContext(this.props, this.context).onChangeKey('family', 'true');
  }

  render = () => {
    const state = this.context.store;
    const handlers = this.context.handlers;
    const forms = state.forms;

    // TODO: validation
    // const errors = {};

    const controls = {
      email: {
        value: !!state.auth && !!state.auth.email ? state.auth.email : '',
        disabled: !!state.auth && !!state.auth.email,
      },
      gender: [
        {
          value: 'male',
          label: 'Male',
        }, {
          value: 'female',
          label: 'Female',
        },
      ],
      nationality: nationalities,
      family: [
        {
          value: 'true',
          label: 'Yes',
        },
        {
          value: 'false',
          label: 'No',
        },
      ],
      imageURL: forms.account.avatar,
      onLoad: (file, uploadResult) => {
        if (!file || file.type.indexOf("image") <= -1) {
          console.log("no file selected");
          handlers.addToastr({
            id: "avatarNU",
            title: "Image could not be uploaded",
            message: "Please select an image",
            type: 'error',
            options: {
              showCloseButton: true,
              timeOut: 5000,
            }
          })
        } else {
          handlers.changeFields('account', { "avatar": uploadResult })
          handlers.addToastr({
            id: "avatarNU",
            title: "Image uploaded",
            message: "Your avatar has been uploaded",
            type: 'success',
            options: {
              showCloseButton: true,
              timeOut: 5000,
            },
          });
          this.forceUpdate();
        }
      }
    };

    return (
      <ProfileCreationStep
        {...IStepContext(this.props, this.context)}
        {...controls} />
    );
  }
}

ProfileStepContext.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired,
}
