import React from 'react'
import PropTypes from 'prop-types'
import LocationStep from '../auth/profile/LocationStep'
import SkillsStep from '../auth/profile/SkillsStep'


const ProfileCreationStep = ({ text , camps, countries, studies, skills }) => {
    if (text === "location") {
      return ( 
      	 <LocationStep  {...{camps,countries}} />
      	 );
    } else if (text === "skills") {
      return ( 
      	 <SkillsStep  {...{studies,skills}} />
      	 );
    }

    else {
        return ( 
        < div > 
        	{ text } 
        < /div>
        );
    }

}

ProfileCreationStep.PropTypes = {
    text: PropTypes.string.isRequired,
}

export default ProfileCreationStep
