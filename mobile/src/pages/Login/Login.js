import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

import { compose } from 'redux';

import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';

import { FullLoading } from '../../components/Loading';
import { withNavigationHelpers } from '../../services/navigation';
import { loginWithGoogle, loginWithFacebook } from '../../services/auth';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
    };

    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
  }
  componentWillMount() {
    if (this.props.isLoggedIn) {
      this.props.navigation.resetTo('SelectCamp');
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      this.props.navigation.resetTo('SelectCamp');
    }
  }
  async handleGoogleLogin() {
    this.setState({ loading: true, error: false });
    try {
      await loginWithGoogle();
      this.setState({ loading: false, error: false });
    } catch (error) {
      this.setState({ loading: false, error: true });
    }
  }
  async handleFacebookLogin() {
    this.setState({ loading: true, error: false });
    try {
      await loginWithFacebook();
      this.setState({ loading: false, error: false });
    } catch (error) {
      this.setState({ loading: false, error: true });
    }
  }
  render() {
    const { loading, error } = this.state;
    const { isProfileLoaded, isProfileEmpty } = this.props;
    if (!isProfileLoaded || loading) {
      return <FullLoading />;
    }
    if (error) {
      return (
        <View>
          <Text>Encountered auth error</Text>
        </View>
      );
    }

    return (
      <View>
        <TouchableHighlight
          style={{ backgroundColor: 'red', height: 40 }}
          onPress={this.handleGoogleLogin}
        >
          <Text>Login with google</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={{ backgroundColor: 'blue', height: 40 }}
          onPress={this.handleFacebookLogin}
        >
          <Text>Login with facebook</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const mapState = (state) => {
  const { profile, auth } = state.firebase;
  const isProfileLoaded = isLoaded(profile);
  const isProfileEmpty = isEmpty(profile);
  return {
    isProfileLoaded,
    isProfileEmpty,
    isLoggedIn: auth && auth.uid,
    auth,
  };
};

export default compose(
  firebaseConnect(),
  connect(mapState),
  withNavigationHelpers(),
)(Home);
