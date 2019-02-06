import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import TextInput from '../inputs/TextInput';
import * as validate from "../util/Validator";
import { Link, Button } from "../util/Clickable";

class PromotionCodeForm extends Component {

  onClear = () => {
    this.props.initialize({code: ""});
  }

  render = () => {
    return (
      <form onSubmit={this.props.handleSubmit} action={this.props.action} method="post">
        <div className="uk-margin-small uk-position-relative">
          <Field 
            name="code" type="text" required={true} component={TextInput} placeholder="クーポンコードを入力"
            validate={[ validate.required, validate.maxLength(16) ]}
          />

          { ( ()=>{
            if( this.props.success ){
              return (
                <span className="uk-position-small uk-position-center-right uk-text-success" {...{'uk-icon': 'check'}}></span>
              );
            }
          })()}
          
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
        <div className="uk-margin-small uk-text-right">
          <Link className="uk-button uk-button-small uk-button-default" ga={{category: "click"}} onClick={() => {
            this.onClear();
            this.props.onClear && this.props.onClear();
          }}>
            クリア
          </Link>
          <Button className="uk-button uk-button-small uk-button-primary" type="submit" disabled={this.props.invalid} ga={{category: "click"}}>
            適用
          </Button>
        </div>
      </form>
    )
  }
}


const form = reduxForm({
  form: 'promotionCodeForm'
})(PromotionCodeForm)

export default form;