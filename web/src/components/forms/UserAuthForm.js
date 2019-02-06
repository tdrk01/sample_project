import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm, SubmissionError } from 'redux-form'

import TextInput from '../inputs/TextInput'
import * as validate from "../util/Validator";
import { Link, Button } from "../util/Clickable";
import { checkEmail } from "../../actions/auth";

class UserAuthForm extends Component {

  componentDidMount = () => {
    if( this.props.initialValues != null ){
      this.props.initialize(this.props.initialValues);  
    }
  }

  render = () => {
    return (
      <form onSubmit={this.props.handleSubmit} >
        <div className="uk-margin">
          <Field
            name="current_password" type="password" component={TextInput} label="現在のパスワード" required={true}
            validate={[ validate.required, validate.password ]}
          />
        </div>
        <div className="uk-margin">
          <Field
            name="password" type="password" component={TextInput} label="新しいパスワード" required={true}
            validate={[ validate.required, validate.password ]}
          />
        </div>
        <div className="uk-margin">
          <Field
            name="password_confirmation" type="password" component={TextInput} label="新しいパスワードの確認" required={true}
            validate={[ validate.required, validate.isConfirmed('password') ]}
          />
        </div>
        { ( ()=>{
          if( this.props.message != null ){
            return (
              <p className="uk-text-danger">
                <small>{ this.props.message }</small>
              </p>
            );
          }
        } )() }
        <div className="uk-margin uk-text-center">
          <Button className="uk-button uk-button-primary" type="submit" disabled={this.props.invalid}>
            { this.props.buttonText != null ? this.props.buttonText : "保存" }
          </Button>
        </div>
      </form>
    )
  }
}

UserAuthForm = reduxForm({
  form: 'userAuthForm',
  asyncValidate: validate.emailExists,
  asyncBlurFields: ['email']
})(UserAuthForm)

export default UserAuthForm;