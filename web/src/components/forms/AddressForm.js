import React, { Component } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import TextInput from '../inputs/TextInput'
import * as validate from "../util/Validator";
import { checkEmail } from "../../actions/auth";
import { Link, Button } from "../util/Clickable";

class AddressForm extends Component {

  render() {
    return (
      <form onSubmit={this.props.handleSubmit} >
        <div className="uk-margin">
          <Field 
            name="post_code" type="test" component={TextInput} label="郵便番号" required={true}
            validate={[ validate.required ]}
            ga={{category: "send", action: "input_post_code", label: "",nonInteraction: true}}
            placeholder="123-1234"
          />
        </div>
        <div className="uk-margin">
          <Field 
            name="address" type="test" component={TextInput} label="住所" required={true}
            validate={[ validate.required ]}
            ga={{category: "send", action: "input_postcode", label: "",nonInteraction: true}}
            placeholder="東京都渋谷区1-1-1"
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
          <Button className="uk-button uk-button-primary" type="submit" disabled={this.props.invalid} ga={{category: "register", action: "tap_account_create", label: "",nonInteraction: true}}>
            送付先の設定送信
          </Button>
        </div>
      </form>
    )
  }
}

const form = reduxForm({
  form: "registerForm",
})(AddressForm)

const mapStateToProps = state => {
    return {
      user: state.user
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(form)