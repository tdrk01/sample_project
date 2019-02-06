import React, { Component } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import TextInput from '../inputs/TextInput'
import * as validate from "../util/Validator";
import { Link, Button } from "../util/Clickable";
import { checkEmail } from "../../actions/auth";

class ResetForm extends Component {

  render() {
    return (
      <form onSubmit={this.props.handleSubmit} >
        <div className="uk-margin">
          <Field
            name="password" type="password" component={TextInput} label="パスワード" required={true}
            validate={[ validate.required, validate.password ]}
          />
        </div>
        <div className="uk-margin">
          <Field
            name="password_confirmation" type="password" component={TextInput} label="パスワードの確認" required={true}
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
            パスワードのリセット
          </Button>
        </div>
      </form>
    )
  }
}

const form = reduxForm({
  form: 'resetForm',
})(ResetForm)

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(form)