import React from 'react'
import PropTypes from 'prop-types'
import ProfileCreationStep from '../ProfileCreationStep'
import { nationalities} from '../../../utils'

const ProfileStepContext = (props, context) => {
	const state = context.store;
	const handlers = context.handlers;
	const forms = state.forms.account;

	// TODO: validation
	// const errors = {};

  // TODO: save the radio values to form
  const panel = {
  	controlsFamily : [{
        value: 'true',
        label: 'Yes',
    }, {
        value: 'false',
        label: 'No',
    }],
    controlsGender: [{
        value: 'male',
        label: 'Male',
    }, {
        value: 'female',
        label: 'Female',
    }],
    imageURL: forms.avatar,
    onChangeKey: (key, value) => handlers.changeFields('account', {[key]: value }),
    onLoad:  (file,uploadResult) => {
	    if (!file || file.type.indexOf("image") <= -1) {
	   	  console.log("no file selected");
	   	  handlers.addToastr({id:"avatarNU",
		    title:"Image could not be uploaded",
		    message:"Please select an image",
		    type: 'error',
		    options: {
		      showCloseButton: true,
		      timeOut: 5000
		    }})
	    } else {
			  handlers.changeFields('account', {"avatar": uploadResult })
			  handlers.addToastr({id:"avatarNU",
			    title:"Image uploaded",
			    message:"Your avatar has been uploaded",
			    type: 'success',
			    options: {
			      showCloseButton: true,
			      timeOut: 5000
			    },
				})
		  }
		}
	};

	return (
		<ProfileCreationStep {...{nationalities,...panel}} />
	);
}

ProfileStepContext.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}

export default ProfileStepContext
