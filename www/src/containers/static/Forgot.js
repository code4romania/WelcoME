import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as Actions from '../../actions';

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = "Please enter an email.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

class Forgot extends React.Component {

  handleFormSubmit = (values) => {
    this.props.forgotUser(values);
  };

  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <fieldset className={`form-group ${touched && error ? 'has-error' : ''}`}>
      <label className="control-label">
        {label}
      </label>
      <div>
        <input
          {...input}
          placeholder={label}
          className="form-control"
          type={type} />
        {touched && error && <div className="help-block">{error}</div>}
      </div>
    </fieldset>
  );

  renderAuthenticationError() {
    if (this.props.authenticationError) {
      return (
        <div className="alert alert-danger">
          { this.props.authenticationError }
        </div>
      );
    }
    return <div></div>;
  }

  render() {
    return(
      <div className="container">
        <div className="col-md-6 col-md-offset-3">
          <h2 className="text-center">
            Forgot Password
          </h2>

          { this.renderAuthenticationError() }

          <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
            <Field
              name="email"
              component={this.renderField}
              className="form-control"
              type="text"
              label="Email" />
            <button action="submit" className="btn btn-primary">
              Reset password
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticationError: state.auth.error && state.auth.error.message,
  };
}


export default connect(mapStateToProps, Actions)(reduxForm({
  form: 'forgot',
  validate,
})(Forgot));
