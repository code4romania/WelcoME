import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

import { compose } from 'recompose';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import { FullLoading } from '../../components/Loading';

import { campPropType } from '../../propTypes/camp';

import CampMap from './components/CampMap';
import CampPicker from './components/CampPicker';

class SelectCamp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCampId: undefined,
    };

    this.handleCampChanged = this.handleCampChanged.bind(this);
  }
  handleCampChanged(selectedCampId) {
    if (!selectedCampId) {
      return;
    }
    this.setState({
      selectedCampId,
    });
  }
  render() {
    const { selectedCampId } = this.state;
    const { camps, campsLoading, campsEmpty } = this.props;

    if (campsLoading) {
      return <FullLoading />;
    }

    if (campsEmpty) {
      return (
        <View>
          <Text>Camps empty</Text>
        </View>
      );
    }
    const selectedCamp = selectedCampId ? camps[selectedCampId] : undefined;

    return (
      <View>
        <CampMap camp={selectedCamp} />
        <CampPicker
          value={selectedCampId}
          onChange={this.handleCampChanged}
          camps={camps}
        />
      </View>
    );
  }
}
SelectCamp.defaultProps = {
  camps: undefined,
};
SelectCamp.propTypes = {
  camps: PropTypes.objectOf(campPropType),
  campsLoading: PropTypes.bool.isRequired,
  campsEmpty: PropTypes.bool.isRequired,
};

const mapState = (state) => {
  const { firebase: { data: { camps } } } = state;
  return {
    camps,
    campsLoading: !isLoaded(camps),
    campsEmpty: isEmpty(camps),
  };
};

export default compose(firebaseConnect(['camps']), connect(mapState))(
  SelectCamp,
);
