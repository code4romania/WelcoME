import React from 'react'
import './stepper.css'
import Button from 'react-md/lib/Buttons/Button'
import '../../../../node_modules/react-mdl/extra/material.css'
import '../../../../node_modules/react-mdl/extra/material.js'
import '../../../../node_modules/react-mdl-stepper/stepper.css'
import './stepper.css'
import { Stepper, Step, StepActions, StepContent } from '../../../../node_modules/react-mdl-stepper/dist/index';

const CustomStepper = (props) => {
    const stepItems = props.steps.map((item) =>

        <Step title={item.props.title} key={item.props.title} editable>
	        <StepContent>
	            {item}
	        </StepContent>
	        <StepActions>
	          <Button data-stepper-next
	                style={{textTransform: 'inherit', backgroundColor: '#79afff', color: '#f0f0f0', boxShadow: '0 0', borderRadius: '1px', height: '50px'}}    
	                raised
	                iconBefore={false}
	                label='Next'
	                 />
	        </StepActions>
      </Step>

    );
    return (
        <Stepper>
      		 {stepItems}
    	</Stepper>
    );
}

export default CustomStepper;