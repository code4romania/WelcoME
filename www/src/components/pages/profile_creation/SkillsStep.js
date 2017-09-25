import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from 'react-md/lib/SelectionControls/Checkbox'
import Grid from 'material-ui-next/Grid';
import Step from './Step'
import { Text, SelectField } from '../../common/common'

const SkillsStep = ({
  onChangeKey,
  getFormValue,
  studies,
  skills,
  onSkillChange,
}) => {
  const skillsItems = skills.map((skill) =>
    <Grid item xs={4} key={skill}>
      <Checkbox
        id={skill}
        name={'skill_' + skill}
        label={<Text type="p" text={skill} />}
        onChange={value => onSkillChange(skill, value)}
        defaultChecked={!!getFormValue('skills')
          ? getFormValue('skills').includes(skill)
          : false
        }
        className={'welcome-input'} />
    </Grid>
  );

  const renderStudies = () => {
    return (
      <Grid container spacing={24} direction={'row'}>
        <Grid item xs={4}>
          <Text type="p" text="What are your latest studies?" />
        </Grid>
        <Grid item xs={8}>
          <SelectField
            id="studies"
            key="studies"
            menuItems={studies}
            onChange={value => onChangeKey('studies', value)}
            defaultValue={getFormValue('studies') || studies[0]}
            required />
        </Grid>
      </Grid>
    );
  }

  const renderSkills = () => {
    return (
      <Grid container spacing={24} direction={'column'}>
        <Grid item xs>
          <Text
            type={'p'}
            text={
              'What do you like to do? What are your skills?' +
              'Select from the list below:'
            }
          />
        </Grid>
        <Grid item xs>
          <Grid container spacing={24}>
            {skillsItems}
          </Grid>
        </Grid>
      </Grid>
    );
  }

  // TODO: put the save button in navigation
  const renderStep = () => {
    return (
      <Grid container spacing={24} direction={'column'}>
        <Grid item xs>
          {renderStudies()}
        </Grid>
        <Grid item xs>
          {renderSkills()}
        </Grid>
      </Grid>
    );
  }

  return (
    <Step>
      {renderStep()}
    </Step>
  );
}

SkillsStep.propTypes = {
  studies: PropTypes.arrayOf(PropTypes.string).isRequired,
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSkillChange: PropTypes.func.isRequired,
}

export default SkillsStep
