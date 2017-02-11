import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions';
import {Field, reduxForm} from 'redux-form';

class EditProfile extends React.Component {

  componentDidMount() {
    this
      .props
      .initialize(this.props.profile);
  }

  handleFormSubmit = (values) => {
    this
      .props
      .actions
      .updateProfile(values);
  };

  renderField = ({input, label, type}) => (
    <fieldset className="form-group">
      <label>
        {label}
      </label>
      <div>
        <input {...input} placeholder={label} className="form-control" type={type}/>
      </div>
    </fieldset>
  );

  render() {
    if (!this.props.received) 
      return <div></div>;
    return (
      <div className="container">
        <div className="col-md-6 col-md-offset-3">
          <h2 className="text-center">
            Profile
          </h2>

          <form
            onSubmit={this
            .props
            .handleSubmit(this.handleFormSubmit)}>
            <Field name="name" type="text" component={this.renderField} label="Name"/>

            <Field name="surname" type="text" component={this.renderField} label="Surname"/>

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
    received: state.auth.profile.received,
    profile: {
      name: state.auth.profile.name,
      surname: state.auth.profile.surname
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'editprofile'})(EditProfile));
