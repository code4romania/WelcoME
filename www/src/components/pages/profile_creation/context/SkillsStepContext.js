import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import {studies, skills} from '../../../utils'
import IStepContext from './IStepContext'
import SkillsStep from '../SkillsStep'

export default class SkillsStepContext extends PureComponent {
  // Init studies
  componentDidMount = () => {
    IStepContext(this.props, this.context)
      .onChangeKey('studies', studies[0]);
  }

  render = () => {
    const state = this.context.store;
    const handlers = this.context.handlers;
    const forms = state.forms;

    // TODO: validation
    // const errors = {};

    const controls = {
      studies: studies,
      skills: skills,
      onSkillChange: (name, value) => {
        let profileSkills = !!this.context.store.forms.account.skills
          ? this.context.store.forms.account.skills
          : [];

        if (value) {
          profileSkills.push(name);
        } else {
          profileSkills = profileSkills.filter((i, _) => i !== name);
        }

        handlers.changeFields('account', {'skills':  profileSkills});
      },
      requestSaveProfile: () => handlers.requestCompleteProfile(forms),
    };

    return (
      <SkillsStep
        {...IStepContext(this.props, this.context)}
        {...controls} />
    );
  }
}

SkillsStepContext.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}
