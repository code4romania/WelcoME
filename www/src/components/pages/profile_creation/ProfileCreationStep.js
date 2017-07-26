import React from 'react'
import PropTypes from 'prop-types'

const ProfileCreationStep = ({ text}) => {
        return ( 
        < div > 
        	{ text } 
        < /div>
        );
}

ProfileCreationStep.PropTypes = {
    text: PropTypes.string.isRequired,
}

export default ProfileCreationStep
