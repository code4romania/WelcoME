import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from 'react-md/lib/SelectionControls/Checkbox'
import Button from 'react-md/lib/Buttons/Button'
import { Grid, Row, Col } from 'react-flexbox-grid'
import Step from './Step'
import { Text, SelectField } from '../../common/common'

const SkillsStep = ({
  studies,
  skills,
  requestSaveProfile,
}) => {
  const skillsItems = skills.map((skill) =>
    <Col xs={4} md={4} lg={4} key={skill + '_container'}>
      <Checkbox
        id={skill}
        name={'skill_' + skill}
        label={<Text type="p" text={skill} />}/>
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
                required
                defaultValue={studies[0]}
                menuItems={studies}
                fullWidth />
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
                className='authAction'
                style={{textTransform: 'inherit', backgroundColor: '#79afff', color: '#f0f0f0', boxShadow: '0 0', borderRadius: '1px', height: '50px'}}
                onClick={requestSaveProfile}
                raised
                iconBefore={false}
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
    requestSaveProfile: PropTypes.func.isRequired,
}

export default SkillsStep
