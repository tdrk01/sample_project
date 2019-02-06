import React, { Component } from'react'
import ReactGA from 'react-ga';

export default class SelectInput extends Component {

  onClick = () => {
    if( this.props.ga != null && process.env.REACT_APP_GOOGLE_ANALYTICS_TAG != null && process.env.REACT_APP_GOOGLE_ANALYTICS_TAG.length > 0 ){
      ReactGA.event(this.props.ga);
    }
  }

  render() {
    return (
      <div>
        { (()=>{
          if(this.props.label != null){
            return (
              <label className="uk-form-label">
                { this.props.label }
                {(()=>{
                  if(this.props.requdired){
                    return (
                      <small className="uk-text-danger uk-margin-small-left">※必須</small>
                    );
                  }
                })()}
              </label>
            );    
          }
        })() }
        <div className="uk-form-input">
          <select 
            className="uk-select uk-input-custom" {...this.props.input} 
            placeholder={this.props.label} 
            type={this.props.type}
            onClick={this.onClick}
          >
            { this.props.children }
          </select>
        </div>
        {this.props.touched && this.props.error && <small className="uk-text-danger">{this.props.error}</small>}
      </div>
    )
  }
}