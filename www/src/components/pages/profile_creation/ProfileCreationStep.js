import React from 'react'
import PropTypes from 'prop-types'
import SelectionControlGroup from 'react-md/lib/SelectionControls/SelectionControlGroup'
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer'
import SelectField from 'react-md/lib/SelectFields'
import TextField from 'react-md/lib/TextFields'
import FontIcon from 'react-md/lib/FontIcons'
import FileUpload from 'react-md/lib/FileInputs/FileUpload'
import { Grid, Row, Col } from 'react-flexbox-grid'

const ProfileCreationStep = ({
  nationalities,
  controlsGender,
  controlsFamily,
  onChangeKey,
  onLoad,
  imageURL
}) => {
  // TODO: #69 break into reusable components
  return (
    <Grid>
      <Row>
        <Col xs={12} lg={4}>
          <Row>
            <FileUpload
              id="profileImg"
              name="profileImg"
              label="Select profile Image"
              accept="image/*"
              onLoad={onLoad} />
          </Row>
          <Row>
	           <img className="avatar" src={imageURL} alt="avatar"/>
	        </Row>
        </Col>
        <Col xs={12} lg={8}>
          <Grid>
            <Row>
              <Col xs={12}  lg={8}>
                <SelectionControlGroup
    		        	id="genders"
    		        	name="genders"
    		        	type="radio"
    		        	required
    		        	inline
    		        	controls={controlsGender}
    		        	onChange={val => onChangeKey('gender', val)} />
              </Col>
  	        </Row>
            <Row>
              <Col xs={12}  lg={8}>
          	    <DatePicker
    	        		id="birthDate"
    	        		label="Date of birth"
    	        		required
    	        		onChange={val => onChangeKey('birthDay', val)} />
  	        	</Col>
  	        </Row>
  	        <Row>
              <Col xs={12} lg={8}>
          	    <SelectField
    	        		id='nationality'
    	        		required
    	        		menuItems={nationalities}
    	        		key='nationality'
    	        		label="Nationality"
    	       			fullWidth
    	       			onChange={val => onChangeKey('nationality', val)}
    	        		position={ SelectField.Positions.BELOW } />
  	           </Col>
  	        </Row>
  	        <Row>
  	        	<Col xs={12} lg={8}>
                <TextField
    				      id="phone"
    				      label="Phone"
    				      required
    				      type="number"
    				      leftIcon={<FontIcon>phone</FontIcon>}
    				      maxLength={10}
    				      onChange={val => onChangeKey('phoneNumber', val)}/>
  	        	</Col>
  	        </Row>
  	        <Row>
              <Col xs={12} lg={8}>
                <TextField
    				      id="email"
    				      label="Email"
    				      required
    				      type="email"
    				      onChange={val => onChangeKey('email', val)} />
  	        	</Col>
  	        </Row>
            <Row>
            	<Col xs={12} lg={3}>
            		<div className="labelFamily"> Are you here with the family ? </div>
            	</Col>
          	  <Col xs={12} lg={9}>
        		    <SelectionControlGroup
  			        	id="withFamily"
  			        	name="withFamily"
  			        	type="radio"
  			        	required
  			        	inline
  			        	controls={controlsFamily}
  			        	onChange={val => onChangeKey('family', val)} />
  	        	</Col>
  	        </Row>
  	      </Grid>
        </Col>
      </Row>
    </Grid>
  );
}

ProfileCreationStep.propTypes = {
  nationalities: PropTypes.arrayOf(PropTypes.string).isRequired,
  controlsGender: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  controlsFamily: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  onChangeKey: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired,
  imageURL: PropTypes.string,
}

export default ProfileCreationStep
