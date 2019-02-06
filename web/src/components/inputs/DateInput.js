import React, { Component } from'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import SelectInput from "./SelectInput";
import * as validate from "../util/Validator";

class DateInput extends Component {

  constructor(props) {
    super(props);

    this.years = [];
    for (var i = 1950; i <= (new Date()).getFullYear(); i ++ ) {
      this.years.push(i);
    }
    this.months = [];
    for (var i = 1; i <= 12; i ++ ) {
      this.months.push(i);
    }
    this.dates = [];
    for (var i = 1; i <= 31; i ++ ) {
      this.dates.push(i);
    }
  }

  render = () => {
    return (
      <div>
        <label className="uk-form-label">
          { this.props.label }
          {(()=>{
            if(this.props.required){
              return (
                <small className="uk-text-danger uk-margin-small-left">※必須</small>
              );
            }
          })()}
        </label>
        <div className="uk-form-input uk-grid-small" {...{'uk-grid': ''}}>
          <div className="uk-width-1-3">
            <Field name={this.props.name+".year"} component={SelectInput} validate={[ validate.required ]} >
              <option>年</option>
              {
                this.years.map( (year, index) => {
                  return (
                    <option key={index} value={year}>
                      {year}年
                    </option>
                  );
                })
              }
            </Field>
          </div>
          <div className="uk-width-1-3">
            <Field name={this.props.name+".month"} component={SelectInput} validate={[ validate.required ]}>
              <option>月</option>
              {
                this.months.map( (month, index) => {
                  return (
                    <option key={index} value={month}>
                      {month}月
                    </option>
                  );
                })
              }
            </Field>
          </div>
          <div className="uk-width-1-3">
            <Field name={this.props.name+".date"} component={SelectInput} validate={[ validate.required ]}>
              <option>日</option>
              {
                this.dates.map( (date, index) => {
                  return (
                    <option key={index} value={date}>
                      {date}日
                    </option>
                  );
                })
              }
            </Field>
          </div>
        </div>
      </div>
    )
  }
}

export default DateInput;