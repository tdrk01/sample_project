import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm, SubmissionError } from 'redux-form'

import TextInput from '../inputs/TextInput'
import SelectInput from "../inputs/SelectInput";
import DateInput from "../inputs/DateInput";
import CheckBox from "../inputs/CheckBox";
import * as validate from "../util/Validator";
import { Link, Button } from "../util/Clickable";
import { checkEmail } from "../../actions/auth";

class UserDetailForm extends Component {

  componentDidMount = () => {
    if( this.props.initialValues != null ){
      this.props.initialize(this.props.initialValues);
    }
  }

  render = () => {
    return (
      <form onSubmit={this.props.handleSubmit} >
        {(()=>{
          if( this.props.editing ) {
            return (
              <div className="uk-margin">
                <Field 
                  name="email" type="email" component={TextInput} label="メールアドレス" required={true}
                  validate={[ validate.required, validate.email ]}
                />
              </div>
            );
          }
        })()}
        <div className="uk-margin">
          <Field 
            name="name" type="text" component={TextInput} label="氏名" required={true}
            validate={[ validate.required ]}
          />
        </div>
        <div className="uk-margin">
          <DateInput name="birthday" label="生年月日" required={true} />
        </div>
        <div className="uk-margin">
          <Field 
            name="gender" required={true} component={SelectInput} label="性別"
            validate={[ validate.required ]}
            ga={{category: "input", action:"userdetail__gender"}}
          >
            <option value={"0"}>男性</option>
            <option value={"1"}>女性</option>
          </Field>
        </div>
        <div className="uk-margin">
          <Field 
            name="tel" type="tel" component={TextInput} required={true} label="TEL"
            validate={[ validate.required ]}
          />
        </div>
        <div className="uk-margin">
          <Field 
            ga={{category: "input", action:"userdetail__opted_out"}}
            name="opted_out" type="checkbox" component={CheckBox} label="tamate bacoからのお知らせを受け取る"
          />
        </div>
        { ( ()=>{
          if( this.props.message != null ){
            return (
              <p className="uk-text-danger">
                { this.props.message }
              </p>
            );
          }
        } )() }
        <div className="uk-margin uk-text-center">
          <Button className="uk-button uk-button-primary" type="submit" disabled={this.props.invalid }>
            { this.props.buttonText != null ? this.props.buttonText : '新規登録' }
          </Button>
        </div>
      </form>
    )
  }
}

UserDetailForm = reduxForm({
  form: 'userDetailForm',
  initialValues: {
    birthday: {year: 1990, month:1, date:1},
    gender: 0,
    opted_out: true
  }
})(UserDetailForm)

export default UserDetailForm;