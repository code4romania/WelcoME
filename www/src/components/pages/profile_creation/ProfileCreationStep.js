import React from 'react'
import PropTypes from 'prop-types'
import LocationStep from './LocationStep'
import SkillsStep from './SkillsStep'


const ProfileCreationStep = ({ text , onChangeKey, campLocation, campCountry, camps, countries, studies, skills }) => {
    if (text === "location") {
      return ( 
      	 <LocationStep  {...{onChangeKey, campLocation, campCountry, camps,countries}} />
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
