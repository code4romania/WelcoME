import React from 'react'
import PropTypes from 'prop-types'
import LocationStep from '../LocationStep'
import IStepContext from './IStepContext'
import { config } from '../../../../googleMaps/config'

const LocationStepContext = (props, context) => {
  const state = context.store;
  const handlers = context.handlers;
  const account = state.forms.account;
  const temp = state.forms.temp;

  // TODO: validation
  // const errors = {};

  const getCampCountries = () => {
    let campCountries = [];
    Object.keys(state.camps.camps).forEach(function(campId) {
      campCountries.push(state.camps.camps[campId].Location.country)
    });

    return campCountries.filter(
      (country, pos) => campCountries.indexOf(country) === pos
    );
  }

  let campCountries = getCampCountries();

  const getCamps = () => {
    let camps = [];
    Object.keys(state.camps.camps).forEach(function(campId) {
        camps.push(state.camps.camps[campId]);
    });

    return camps;
  }

  let camps = getCamps();

  const center = (camp) => [
    camp.Location.geolocation.lat,
    camp.Location.geolocation.long
  ];

  const googleMapControls = {
    config: config,
    centerMap: !!temp && !!temp.centerMap ? temp.centerMap : center(camps[0]),
    zoomLevel: !!temp && !!temp.zoomLevel ? temp.zoomLevel : 1,
    camps: camps,
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

      handlers.changeFields('account', { 'camp': {
        'country': selectedCountry,
      }});

      const centerMap = center(selectedCamps[0]);
      handlers.changeFields('temp', { 'campsPerCountry': campsPerCountry });
      handlers.changeFields('temp', { 'centerMap': centerMap });
      handlers.changeFields('temp', { 'zoomLevel': 4 });
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
          selectedC.push(state.camps.camps[campId]);
        }
      })

      handlers.changeFields('account', { 'camp': {
        ...account.camp,
        'city': city,
        'name': name,
      }});

      const centerMap = center(selectedC[0]);
      handlers.changeFields('temp', { 'selectedCamp': selectedCamp });
      handlers.changeFields('temp', { 'centerMap': centerMap });
      handlers.changeFields('temp', { 'zoomLevel': 8 });
    },
  };

  const controls = {
    campCountries: campCountries,
    campsPerCountry: temp.campsPerCountry,
    googleMapControls: googleMapControls,
  };

  return (
    <LocationStep
      {...IStepContext(props, context)}
      {...controls} />
  );
}

LocationStepContext.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired,
}

export default LocationStepContext
