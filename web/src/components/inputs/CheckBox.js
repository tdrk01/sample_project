import React, { Component } from'react'
import ReactGA from 'react-ga';

export default class CheckBox extends Component {

  onClick = () => {
    if( this.props.ga != null && process.env.REACT_APP_GOOGLE_ANALYTICS_TAG != null && process.env.REACT_APP_GOOGLE_ANALYTICS_TAG.length > 0 ){
      ReactGA.event(this.props.ga);
    }
  }

  render = () => {
    return (
      <div>
        <div className="uk-form-input">
          <label>
            <input className="uk-checkbox" type="checkbox" {...this.props.input} onClick={this.onClick}/> 
            <span className="uk-margin-small-left">
              { this.props.label }
              {(()=>{
                if(this.props.required){
                  return (
                    <small className="uk-text-danger uk-margin-small-left">※必須</small>
                  );
                }
              })()}
            </span>
          </label>
        </div>
        {this.props.touched && this.props.error && <small className="uk-text-danger">{this.props.error}</small>}
      </div>
    )
  }
}