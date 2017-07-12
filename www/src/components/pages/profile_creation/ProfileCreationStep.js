import React from 'react'
import PropTypes from 'prop-types'
import LocationStep from '../auth/profile/LocationStep'


const ProfileCreationStep = ({ text , data }) => {
    if (text == "location") {
      return ( 
      	 <LocationStep  {...{data}} />
      	 );
    } else {
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
