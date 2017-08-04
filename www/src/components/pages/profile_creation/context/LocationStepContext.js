import React from 'react'
import PropTypes from 'prop-types'
import LocationStep from '../LocationStep'
import {config} from '../../../../googleMaps/config'

const LocationStepContext = (props, context) => {
	const state = context.store;
  const handlers = context.handlers;

	// TODO: save to form

	// TODO: validation
  // const errors = {};

	const getCampsCountries = function() {
		const campsCountries = [];
		Object.keys(state.camps.camps).forEach(function(campId) {
	    campsCountries.push(state.camps.camps[campId].Location.country)
		});

		return campsCountries.filter(
			(country,pos) => campsCountries.indexOf(country) === pos
		);
	}

  let campsCountries = getCampsCountries();

	const getCamps = function() {
		const camps = [];
    Object.keys(state.camps.camps).forEach(function(campId) {
      camps.push(state.camps.camps[campId]);
    });

    return camps;
  }

	const camps = getCamps();

  const center = function(camp) {
    return [camp.Location.geolocation.lat, camp.Location.geolocation.long];
  }

 	const panel = {
  	centerMap: state.forms.account.centerMap || center(camps[0]),
    zoomLevel: state.forms.account.zoomLevel || 1,
    camps: camps,
    campsCountries: campsCountries,
    campsPerCountry: state.forms.account.campsPerCountry,
    onSelectedCampCountry: (selectedCountry) => {
			let campsPerCountry = [];
      let selectedCamps = [];

      Object.keys(state.camps.camps).forEach(function(campId) {
		    if (state.camps.camps[campId].Location.country === selectedCountry) {
        	campsPerCountry.push(
						state.camps.camps[campId].Location.city + " - " + state.camps.camps[campId].name
					);
		      selectedCamps.push(state.camps.camps[campId]);
		    }
      });

			const centerMap = center(selectedCamps[0]);
			handlers.changeFields('account', {'campsPerCountry': campsPerCountry});
			handlers.changeFields('account', {'centerMap': centerMap});
			handlers.changeFields('account', {'zoomLevel': 4});
    },
    onSelectedCamp: (selectedCamp) => {
    	let name = selectedCamp.split("-")[1].trim();
			let city = selectedCamp.split("-")[0].trim();

      let selectedC = [];
      Object.keys(state.camps.camps).forEach(function(campId) {
        if (
					state.camps.camps[campId].name === name &&
					state.camps.camps[campId].Location.city === city
				) {
        	console.log("here");
					selectedC.push(state.camps.camps[campId]);
        }
    	})

			const centerMap = center(selectedC[0]);
			handlers.changeFields('account', {'selectedCamp': selectedC[0]});
			handlers.changeFields('account', {'centerMap': centerMap});
			handlers.changeFields('account',{'zoomLevel': 8});
    }
  }

	const profile = {
  	config:config,
    onChangeKey: (key, value) => handlers.changeFields(
			'account',
			{[key]: value }
		),
  }

 	return (
		<LocationStep {...profile} {...panel} />
	);
}

LocationStepContext.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}

export default LocationStepContext
