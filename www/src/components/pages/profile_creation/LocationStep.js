import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col } from 'react-flexbox-grid'
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
      <Grid fluid className='formContainer'>
        <Row>
          <Col xs>
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
          </Col>
        </Row>
        <Row>
          <Col xs>
            <SelectField
              id="camp-location"
              key="camp-location"
              label={'Camp'}
              menuItems={campsPerCountry}
              onChange={value => googleMapControls.onSelectedCamp(value)}
              defaultValue={getFormValue('selectedCamp', 'temp')}
              required
              errorText={'A camp is required'} />
          </Col>
        </Row>
      </Grid>
    );
  }

  const renderStep = () => {
    return (
      <Grid fluid className='formContainer'>
        <Row className='formRow'>
          <Col xs={6} className="formRowContent">
            {renderMap()}
          </Col>
          <Col xs={6} className="formRowContent">
            {renderControls()}
          </Col>
        </Row>
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
