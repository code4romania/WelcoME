import React from 'react'
import SelectField from 'react-md/lib/SelectFields'
import { Grid, Row, Col } from 'react-flexbox-grid'

const LocationStep = (camps) => {
    return ( 
    < Grid fluid >
        < Row >
             < SelectField 
                    id = 'camp-location'
                    required = "true"
                    defaultValue = ""
                    menuItems = {camps.data}
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
                    defaultValue = { 0 }
                    menuItems = {['France', 'Germany']}
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
