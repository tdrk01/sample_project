import React, { Component } from'react'
import ReactGA from 'react-ga';

export default class Textarea extends Component {

  onClick = () => {
    if( this.props.ga != null && process.env.REACT_APP_GOOGLE_ANALYTICS_TAG != null && process.env.REACT_APP_GOOGLE_ANALYTICS_TAG.length > 0 ){
      ReactGA.event(this.props.ga);
    }
  }

  render = () => {
    return (
      <div>
        <label className="uk-form-label uk-text-nowrap">
            {this.props.label}<wbr/>
            {(()=>{
              if(this.props.required){
                return (
                  <small className="uk-text-danger uk-margin-small-left">※必須</small>
                );
              }
            })()}
        </label>
        <div className="uk-form-controls">
            <textarea 
              onClick={this.onClick} 
              className="uk-textarea uk-height-medium uk-input-custom" 
              {...this.props.input} 
              placeholder={this.props.placeholder}
              autoCorrect="off"
              autoCapitalize="off"
            ></textarea>
        </div>
        {this.props.meta.touched && this.props.meta.error && <small className="uk-text-danger">{this.props.meta.error}</small>}
      </div>
    )
  }
}