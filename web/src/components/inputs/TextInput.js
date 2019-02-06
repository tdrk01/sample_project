import React, { Component } from'react'
import ReactGA from 'react-ga';

export default class TextInput extends Component {

  onClick = () => {
    if( this.props.ga != null && process.env.REACT_APP_GOOGLE_ANALYTICS_TAG != null && process.env.REACT_APP_GOOGLE_ANALYTICS_TAG.length > 0 ){
      ReactGA.event(this.props.ga);
    }
  }

  render = () => {
    return (
      <div>
        {(()=>{
          if(this.props.label != null){
            return (
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
            );
          }
        })()}
        <div className="uk-form-controls">
            <input
              onClick={this.onClick}
              style={this.props.style} 
              className="uk-input uk-input-custom" 
              {...this.props.input} 
              placeholder={this.props.placeholder != null ? this.props.placeholder : this.props.label } 
              type={this.props.type}
              autoCorrect="off"
              autoCapitalize="off"
            />
        </div>
        {this.props.meta.touched && this.props.meta.error && <small className="uk-text-danger">{this.props.meta.error}</small>}
      </div>
    )
  }
}