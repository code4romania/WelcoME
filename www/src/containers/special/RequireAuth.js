import React from 'react';
import {connect} from '../../rxdux';
import {browserHistory} from 'react-router';

export const RequireAuth = (WrappedComponent) => {
  class Auth extends React.Component {

    componentWillMount() {
      if (!this.props.authenticated && !this.props.pending) {
        browserHistory.push('/login');
      }
    }

    render() {
      return !this.props.authenticated
        ? <div></div>
        : <WrappedComponent {...this.props}/>;
    }
  }

  const mapStateToProps = (state) => {
    return {authenticated: state.auth.authenticated, pending: state.auth.pending};
  };

  return connect(mapStateToProps)(Auth);
};

export const RequireNotAuth = (WrappedComponent) => {
  class Auth extends React.Component {

    componentWillMount() {
      if (this.props.authenticated && !this.props.pending) {
        browserHistory.push('/');
      }
    }

    render() {
      return this.props.authenticated
        ? <div></div>
        : <WrappedComponent {...this.props}/>;
    }
  }

  const mapStateToProps = (state) => {
    return {authenticated: state.auth.authenticated, pending: state.auth.pending};
  };

  return connect(mapStateToProps)(Auth);
};

export const IifAuth = (WrappedComponentAuth, WrappedComponentNotAuth) => {
  class IifAuth extends React.Component {

    render() {
      return this.props.authenticated
        ? <WrappedComponentAuth {...this.props}/>
        : <WrappedComponentNotAuth {...this.props}/>;
    }
  }

  const mapStateToProps = (state) => {
    return {authenticated: state.auth.authenticated};
  };

  return connect(mapStateToProps)(IifAuth);
};
