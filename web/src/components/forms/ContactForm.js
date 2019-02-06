import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import TextInput from '../inputs/TextInput'
import Textarea from "../inputs/Textarea";
import * as validate from "../util/Validator";
import { Link, Button } from "../util/Clickable";

class ContactForm extends Component {

  render = () => {
    return (
      <form onSubmit={this.props.handleSubmit} action={this.props.action} method="post" >
        <div className="uk-margin">
          <Field 
            name="email" type="email" component={TextInput} label="メールアドレス"
            validate={[ validate.required, validate.email ]}
          />
        </div>
        <div className="uk-margin">
          <Field 
            name="description" component={Textarea} label="本文"
            validate={[ validate.required ]}
            placeholder="お問い合わせ内容の詳細をこちらに記載してください"
            ga={{category: "input", action:"contact__description"}}
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
          <Button className="uk-button uk-button-primary" type="submit" disabled={this.props.invalid} ga={{category: "click"}}>
            問い合わせる
          </Button>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'contactForm'
})(ContactForm)