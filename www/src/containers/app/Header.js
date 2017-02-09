import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as Actions from '../../actions';

class Header extends React.Component {

  renderAuthLinks() {
    if (this.props.authenticated) {
      // TODO: remove favourites from here
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/favorites">
            My Favorites
          </Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/editprofile">
            Profile
          </Link>
        </li>,
        <li className="nav-item" key={3}>
          <Link className="nav-link" to="/logout" >
            Sign Out
          </Link>
        </li>,
      ];
    } else {
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/signup">
            Sign Up
          </Link>
        </li>,
      ];
    }
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">
              Welcome
            </Link>
          </div>
           <ul className="nav navbar-nav navbar-right">
            { this.renderAuthLinks() }
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, Actions)(Header);
