import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import TextInput from '../inputs/TextInput'
import * as validate from "../util/Validator";
import { Link, Button } from "../util/Clickable";

class LoginForm extends Component {

  render = () => {
    return (
      <form onSubmit={this.props.handleSubmit} action={this.props.action} method="post" >
        <div className="uk-margin">
          <Field 
            name="email" type="email" required component={TextInput} label="メールアドレス"
            validate={[ validate.required, validate.email ]} ga={{category: "login", action: "input_email", label: "",nonInteraction: true}}
          />
        </div>
        <div className="uk-margin">
          <Field
            name="password" type="password" required component={TextInput} label="パスワード"
            validate={[ validate.required, validate.password ]} ga={{category: "login", action: "input_password", label: "",nonInteraction: true}}
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
          <Button className="uk-button uk-button-primary" type="submit" disabled={this.props.invalid} ga={{category: "login", action: "tap_login", label: "",nonInteraction: true}}>
            ログイン
          </Button>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'loginForm'
})(LoginForm)