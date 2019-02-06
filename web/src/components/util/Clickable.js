import React, { Component } from 'react';
import { Link as NativeLink, withRouter } from 'react-router-dom'
import ReactGA from 'react-ga';


export class Link extends Component {

  onClick = (event) => {
    if( this.props.ga != null && process.env.REACT_APP_GOOGLE_ANALYTICS_TAG != null && process.env.REACT_APP_GOOGLE_ANALYTICS_TAG.length > 0 ){
      ReactGA.event(this.props.ga);
    }
    this.props.onClick && this.props.onClick(event);
  }

  render = () => {
    var props = Object.assign({}, this.props);
    delete props.onClick;

    if(props.to == null){
      return (
        <a onClick={this.onClick} {...props}>
          { this.props.children }
        </a>
      );
    }else{
      return (
        <NativeLink onClick={this.onClick} {...props}>
          { this.props.children }
        </NativeLink>
      );  
    }
  }
}

export class Button extends Component {

  onClick = (event) => {
    if( this.props.ga != null && process.env.REACT_APP_GOOGLE_ANALYTICS_TAG != null && process.env.REACT_APP_GOOGLE_ANALYTICS_TAG.length > 0){
      ReactGA.event(this.props.ga);
    }
    this.props.onClick && this.props.onClick(event);
  }

  render = () => {
    var props = Object.assign({}, this.props);
    delete props.onClick;
    return (
      <button onClick={this.onClick} {...props}>
        { this.props.children }
      </button>
    );
  }
}