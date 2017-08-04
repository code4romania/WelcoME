import React from 'react'
import PropTypes from 'prop-types'
import SelectField from 'react-md/lib/SelectFields'
import Checkbox from 'react-md/lib/SelectionControls/Checkbox'
import Button from 'react-md/lib/Buttons/Button'
import { Grid, Row, Col } from 'react-flexbox-grid'

const SkillsStep = ({
  studies,
  skills,
  requestSaveProfile,
}) => {

  const skillsItems = skills.map((skill) =>
    <Col xs={4} md={4} lg={4}>
      <Checkbox
        id={skill}
        name={"skill_"+skill}
        label={skill}/>
    </Col>
  );

  // TODO: put the save button in navigation
  return (
    <Grid fluid>
      <Row>
        <Col xs={12} lgOffset={1} lg={3}>
          <div>
            What are your latest studies?
          </div>
        </Col>
        <Col xs={12}  lg={7}>
          <SelectField
            id="studies"
            required
            defaultValue={studies[0]}
            menuItems={studies}
            key="studies"
            fullWidth
            position={SelectField.Positions.BELOW} />
        </Col>
      </Row>
      <Row>
        <Col lgOffset={1}  xs={12} lg={11}>
          <div>
            What do you like to do? What are your skills? Select from the list below:
          </div>
        </Col>
      </Row>
      <Row>
        {skillsItems}
      </Row>
      <Row>
        <Button
          className='authAction'
          style={{textTransform: 'inherit', backgroundColor: '#79afff', color: '#f0f0f0', boxShadow: '0 0', borderRadius: '1px', height: '50px'}}
          onClick={requestSaveProfile}
          raised
          iconBefore={false}
          label='Save Profile' />
      </Row>
    </Grid>
  );
}

SkillsStep.propTypes = {
  requestSaveProfile: PropTypes.func.isRequired,
}

export default SkillsStep
