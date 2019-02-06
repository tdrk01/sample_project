import React, { Component } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import TextInput from '../inputs/TextInput'
import * as validate from "../util/Validator";
import { checkEmail } from "../../actions/auth";
import { Link, Button } from "../util/Clickable";

class RegisterForm extends Component {

  render() {
    return (
      <form onSubmit={this.props.handleSubmit} >
        <div className="uk-margin">
          <Field 
            name="email" type="email" component={TextInput} label="メールアドレス" required={true}
            validate={[ validate.required, validate.email ]}
            ga={{category: "register", action: "input_email", label: "",nonInteraction: true}}
          />
        </div>
        <div className="uk-margin">
          <Field
            name="password" type="password" component={TextInput} label="パスワード" required={true}
            validate={[ validate.required, validate.password ]}
            ga={{category: "register", action: "input_password", label: "",nonInteraction: true}}
          />
        </div>
        <div className="uk-margin">
          <Field
            name="password_confirmation" type="password" component={TextInput} label="パスワードの確認" required={true}
            validate={[ validate.required, validate.isConfirmed('password') ]}
            ga={{category: "register", action: "input_password_confirm", label: "",nonInteraction: true}}
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
        { ( ()=>{
          if( this.props.middle != null ){
            return this.props.middle;
          }
        } )() }
        <div className="uk-margin uk-text-center">
          <Button className="uk-button uk-button-primary" type="submit" disabled={this.props.invalid} ga={{category: "register", action: "tap_account_create", label: "",nonInteraction: true}}>
            アカウント作成
          </Button>
        </div>
      </form>
    )
  }
}

const form = reduxForm({
  form: "registerForm",
  asyncValidate: validate.emailExists,
  asyncBlurFields: ['email']
})(RegisterForm)

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(form)