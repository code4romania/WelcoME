import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import { Field, reduxForm } from 'redux-form';

class EditProfile extends React.Component {

  componentWillMount() {
    this.props.actions.fetchProfile();
  }

  componentDidMount() {
    this.props.initialize(this.props.profileData);
  }

  handleFormSubmit = (values) => {
    this.props.actions.updateProfile(values);
  };

  renderField = ({ input, label, type }) => (
    <fieldset className="form-group">
      <label>
        {label}
      </label>
      <div>
        <input
          {...input}
          placeholder={label}
          className="form-control"
          type={type} />
      </div>
    </fieldset>
  );

  render() {
    return (
      <div className="container">
        <div className="col-md-6 col-md-offset-3">
          <h2 className="text-center">
            Profile
          </h2>

          <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
            <Field
              name="name"
              type="text"
              component={this.renderField}
              label="Name" />

            <Field
              name="surname"
              type="text"
              component={this.renderField}
              label="Surname" />

            <button action="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profileData: {
      name: state.editprofile.profileData.name,
      surname: state.editprofile.profileData.surname,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'editprofile',
})(EditProfile));
