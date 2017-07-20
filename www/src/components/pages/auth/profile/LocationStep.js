import React from 'react'
import SelectField from 'react-md/lib/SelectFields'
import { Grid, Row, Col } from 'react-flexbox-grid'

const LocationStep = ({onChangeKey,campLocation,campCountry,camps, countries}) => {
    return ( 
    < Grid fluid >
        < Row >
             < SelectField 
                    id = 'camp-location'
                    required = "true"
                    value={campLocation}
                    onChange={val => onChangeKey('campLocation', val)}
                    menuItems = {camps}
                    key = 'camp-location'
                    label ="Select Camp"
                    fullWidth = "true"
                    position = { SelectField.Positions.BELOW }
                 / >
        </Row>
        <Row>
                < SelectField 
                    id = 'camp-country'
                    required = "true"
                    value={campCountry}
                    onChange={val => onChangeKey('campCountry', val)}
                    menuItems = {countries}
                    key = 'camp-country'
                    label = "Select Country"
                    fullWidth = "true"
                    position = { SelectField.Positions.BELOW }
                    className = 'md-select-field--toolbar' / >
        < /Row> 
    < /Grid>
    );
}

export default LocationStep
