import React from 'react'
import SelectField from 'react-md/lib/SelectFields'
import Checkbox from 'react-md/lib/SelectionControls/Checkbox'
import { Grid, Row, Col } from 'react-flexbox-grid'

const SkillsStep = ({studies, skills}) => {
const skillsItems = skills.map((skill) =>
     <Col xs={4} md={4} lg={4}>
     <Checkbox
          id={skill}
          name={"skill_"+skill}
          label={skill}
     />
     </Col>
);
    return ( 
    < Grid fluid >
        < Row >
        <Col xs={12} lgOffset={1} lg={3}>
        <div>
            What are your latest studies
        </div>
        </Col>
        <Col xs={12}  lg={7}>
             < SelectField 
                    id = 'studies'
                    required = "true"
                    defaultValue = {studies[0]}
                    menuItems = {studies}
                    key = 'studies'
                    fullWidth = "true"
                    position = { SelectField.Positions.BELOW }
                 / >
        </Col>
        </Row>
        <Row> 
        <Col lgOffset={1}  xs={12} lg={11}>
            <div>
                What do you like to do ? What are your skills ? Select from the list below:
            </div>
        </Col>
        < /Row>
        <Row>
        {skillsItems}
        </Row> 
    < /Grid>
    );
}

export default SkillsStep
