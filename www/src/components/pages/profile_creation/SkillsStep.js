import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from 'react-md/lib/SelectionControls/Checkbox'
import { Grid, Row, Col } from 'react-flexbox-grid'
import Step from './Step'
import { Text, SelectField, Button } from '../../common/common'

const SkillsStep = ({
  onChangeKey,
  getFormValue,
  studies,
  skills,
  onSkillChange,
  requestSaveProfile,
}) => {
  const skillsItems = skills.map((skill) =>
    <Col xs={4} md={4} lg={4} key={skill + '_container'}>
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
    </Col>
  );

  const renderStudies = () => {
    return (
      <Grid fluid className='formContainer'>
        <Row className='formRowContent'>
          <Col xs={4} className='formVerticalAlign'>
            <div>
              <Text type="p" text="What are your latest studies?" />
          </div>
          </Col>
          <Col xs={8} className='formVerticalAlign'>
            <div>
              <SelectField
                id="studies"
                key="studies"
                menuItems={studies}
                onChange={value => onChangeKey('studies', value)}
                defaultValue={getFormValue('studies') || studies[0]}
                required />
              </div>
          </Col>
        </Row>
      </Grid>
    );
  }

  const renderSkills = () => {
    return (
      <Grid fluid className='formContainer'>
        <Row className='formRowContent'>
          <Col xs className='formVerticalAlign'>
            <div>
              <Text type="p" text="What do you like to do? What are your skills? Select from the list below:" />
            </div>
          </Col>
        </Row>
        <Row className='formRowContent'>
          {skillsItems}
        </Row>
      </Grid>
    );
  }

  // TODO: put the save button in navigation
  const renderStep = () => {
    return (
      <Grid fluid className='formContainer'> 
        <Row className='formRow'>
          <Col xs>
            {renderStudies()}
          </Col>
        </Row>
        <Row  className='formRow'>
          <Col xs>
            {renderSkills()}
          </Col>
        </Row>
        <Row className='formRow'>
          <Col xs className="formRowContent">
            <Button
              onClick={requestSaveProfile}
              label='Save Profile' />
          </Col>
        </Row>
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
  requestSaveProfile: PropTypes.func.isRequired,
}

export default SkillsStep
