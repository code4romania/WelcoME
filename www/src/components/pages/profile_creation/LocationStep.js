import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import GoogleMap from 'google-map-react'
import Step from './Step'
import { SelectField } from '../../common/common'

const LocationStep = ({
  config,
  onChangeKey,
  campsCountries,
  centerMap,
  zoomLevel,
  camps,
  campsPerCountry,
  onSelectedCampCountry,
  onSelectedCamp
}) => {
  const Marker = (props) =>
    <div className={props.className}>
      {props.text}
    </div>;

  const listItems = camps.map((camp) =>
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
          bootstrapURLKeys={{key: config.apiKey}}
          center={centerMap}
          zoom={zoomLevel}>
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
              menuItems={campsCountries}
              onChange={val => onSelectedCampCountry(val)}
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
              onChange={val => onSelectedCamp(val)}
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

export default LocationStep
