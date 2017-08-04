import React from 'react'
import SelectField from 'react-md/lib/SelectFields'
import { Grid, Row, Col } from 'react-flexbox-grid'
import GoogleMap from 'google-map-react'

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
      className="camp"
      lat={camp.Location.geolocation.lat}
      lng={camp.Location.geolocation.long}
      text={camp.name} />
  );

  // TODO: #69 break into reusable components
  return (
    <Grid fluid>
      <Row>
        <Col xs={12} lg={5}>
          <GoogleMap
            apiKey={config.apiKey}
            center={centerMap}
            zoom={zoomLevel}>
            {listItems}
          </GoogleMap>
        </Col>
        <Col xs={12} lgOffset={1} lg={6}>
          <Row>
            <SelectField
              id="camp-location"
              required
              onChange={val => onSelectedCampCountry(val)}
              menuItems={campsCountries}
              key="camp-location"
              label="Select Country"
              fullWidth
              position={SelectField.Positions.BELOW} />
          </Row>
          <Row>
            <SelectField
              id="camp-country"
              required
              onChange={val => onSelectedCamp(val)}
              menuItems={campsPerCountry}
              key="camp-country"
              label="Select Camp"
              fullWidth
              position={SelectField.Positions.BELOW}
              className="md-select-field--toolbar" />
          </Row>
        </Col>
      </Row>
    </Grid>
  );
}

export default LocationStep
