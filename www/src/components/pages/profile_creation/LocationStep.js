import React from 'react'
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid';
import GoogleMap from 'google-map-react'
import Step from './Step'
import { SelectField } from '../../common/common'

const LocationStep = ({
  onChangeKey,
  getFormValue,
  campCountries,
  campsPerCountry,
  googleMapControls,
}) => {
  const Marker = (props) =>
    <div className={props.className}>
      {props.text}
    </div>;

  const listItems = googleMapControls.camps.map((camp) =>
    <Marker
      key={camp.name + '_container'}
      className="camp"
      lat={camp.Location.geolocation.lat}
      lng={camp.Location.geolocation.long}
      text={camp.name} />
  );

  const renderMap = () => {
    return (
      <div style={{height: '400px'}}>
        <GoogleMap
          bootstrapURLKeys={{key: googleMapControls.config.apiKey}}
          center={googleMapControls.centerMap}
          zoom={googleMapControls.zoomLevel}>
          {listItems}
        </GoogleMap>
      </div>
    );
  }

  const renderControls = () => {
    return (
      <Grid container spacing={24} direction={'column'}>
        <Grid item xs={12}>
          <SelectField
            id="camp-country"
            key="camp-country"
            label={'Country'}
            menuItems={campCountries}
            onChange={value => googleMapControls.onSelectedCampCountry(value)}
            defaultValue={
              !!getFormValue('camp')
                ? getFormValue('camp').country
                : ''
            }
            required
            errorText={'A country is required'} />
        </Grid>
        <Grid item xs={12}>
          <SelectField
            id="camp-location"
            key="camp-location"
            label={'Camp'}
            menuItems={campsPerCountry}
            onChange={value => googleMapControls.onSelectedCamp(value)}
            defaultValue={getFormValue('selectedCamp', 'temp')}
            required
            errorText={'A camp is required'} />
        </Grid>
      </Grid>
    );
  }

  const renderStep = () => {
    return (
      <Grid container spacing={40}>
        <Grid item xs={6}>
          {renderMap()}
        </Grid>
        <Grid item xs={6}>
          {renderControls()}
        </Grid>
      </Grid>
    );
  }

  return (
    <Step>
      {renderStep()}
    </Step>
  );
}

LocationStep.propTypes = {
  onChangeKey: PropTypes.func.isRequired,
  getFormValue: PropTypes.func.isRequired,
}

export default LocationStep
