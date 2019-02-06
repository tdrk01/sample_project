import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import TextInput from '../inputs/TextInput'
import * as validate from "../util/Validator";
import { Link, Button } from "../util/Clickable";

class ForgetForm extends Component {

  render = () => {
    return (
      <form onSubmit={this.props.handleSubmit} action={this.props.action} method="post" >
        <div className="uk-margin">
          <Field 
            name="email" type="email" required component={TextInput} label="メールアドレス"
            validate={[ validate.required, validate.email ]}
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
            リセット用メールを送信
          </Button>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'forgetForm'
})(ForgetForm)