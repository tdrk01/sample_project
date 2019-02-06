import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import TextInput from '../inputs/TextInput'
import * as validate from "../util/Validator";
import MonthInput from "../inputs/MonthInput";
import { HeaderText } from "../util/Text";
import { Link, Button } from "../util/Clickable";

import visa from "../../assets/images/vendor/visa.png";
import master from "../../assets/images/vendor/mastercard.png";

class CreditForm extends Component {

  componentDidMount = () => {
    if( this.props.initialValues != null ){
      this.props.initialize(this.props.initialValues);  
    }
  }

  render = () => {
    return (
      <form onSubmit={this.props.handleSubmit} action={this.props.action} method="post" >
        <HeaderText>
          購入者情報の入力
        </HeaderText>
        <div className="uk-margin">
          <Field 
            name="user.name" type="text" component={TextInput} label="お名前" required={true}
            validate={[ validate.required ]}
            placeholder="玉 てば子"
            ga={{category: "purchase", action: "input_user_name", label: "",nonInteraction: true}}
          />
        </div>
        <div className="uk-margin">
          <Field 
            name="user.tel" type="tel" component={TextInput} label="電話番号" required={true}
            validate={[ validate.required ]}
            placeholder="08012341234"
            ga={{category: "purchase", action: "input_tel", label: "",nonInteraction: true}}
          />
        </div>

        <HeaderText>
          決済方法
        </HeaderText>
        <div className="uk-margin">
          <img src={visa} className="uk-width-ssmall uk-margin-small-right" />
          <img src={master} className="uk-width-ssmall uk-margin-small-right" />
        </div>
        <div className="uk-margin">
          <Field 
            name="number" type="number" component={TextInput} label="クレジットカード番号" required={true}
            validate={[ validate.required, validate.minLength(14), validate.maxLength(16) ]}
            placeholder="1234567890123456"
            ga={{category: "purchase", action: "input_number", label: "credit",nonInteraction: true}}
          />
        </div>
        <div className="uk-margin">
          <Field 
            name="name" 
            type="text" 
            style={{"imeMode": "inactive"}} component={TextInput} label="クレジットカード名義(半角ローマ字)" required={true}
            validate={[ validate.required ]}
            placeholder="Urashima Taro"
            ga={{category: "purchase", action: "input_name", label: "credit",nonInteraction: true}}
          />
        </div>
        <div className="uk-margin">
          <MonthInput name="exp" label="有効期限(月/年)" />
        </div>
        <div className="uk-margin">
          <Field 
            name="cvc" type="number" component={TextInput} label="セキュリティーコード" required={true}
            validate={[ validate.required, validate.minLength(3), validate.maxLength(3) ]}
            placeholder="000"
            ga={{category: "purchase", action: "input_security_code", label: "credit",nonInteraction: true}}
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
          <Button className="uk-button uk-button-primary" type="submit" disabled={this.props.invalid} ga={{category: "purchase", action: "tap_confirm", label: "",nonInteraction: true}}>
            確認画面へ
          </Button>
        </div>
      </form>
    )
  }
}

var form = reduxForm({
  form: 'creditForm',
})(CreditForm)

export default form
