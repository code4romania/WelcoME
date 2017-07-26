import React from 'react'
import { countries} from '../../../utils'
import PropTypes from 'prop-types'
import LocationStep from '../LocationStep'
const LocationStepContext = (p,context) => {
	const state = context.store;
    const handlers = context.handlers;
  	const getCampsNames = function() {
        const campsNames = []
        Object.keys(state.camps.camps).forEach(function(campId) {
            campsNames.push(state.camps.camps[campId].name)
        })
        return campsNames
    }
    const campsNames = getCampsNames();
 	const panel = {
        camps: campsNames,
        countries: countries
    }
     const profile = {
        onChangeKey: (key, value) => handlers.changeFields('account', {
                [key]: value }),
        }
  	 return ( < LocationStep {...profile} {...panel}
        />)
}
LocationStepContext.contextTypes = {
    store: PropTypes.object.isRequired,
    handlers: PropTypes.object.isRequired
}
export default LocationStepContext
