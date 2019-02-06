import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Path } from '../constants/path'
import Immutable from "immutable";

import cake from "../assets/images/material/cake.png";
import { Logo } from "../components/util/Logo";

import NotFoundScreen from "./NotFoundScreen";
import NotAuthScreen from "./NotAuthScreen";

class RemoteScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notFound: false,
      notAuthorized : false,
    };
  }

  didNotFound = () => {
    this.setState( Immutable.fromJS(this.state)
      .updateIn(["notFound"], v => true )
      .toJS()
    );
  }

  didNotAuthorized = () => {
    this.setState( Immutable.fromJS(this.state)
      .updateIn(["notAuthorized"], v => true )
      .toJS()
    );
  }

  renderFound = () => {
    return null;
  }

  renderNotAuthorized = () => {
    return (
      <NotAuthScreen />
    );
  }

  renderNotFound = () => {
    return (
      <NotFoundScreen />
    );
  }

  render = () => {
    if(this.state.notFound){
      return this.renderNotFound();
    }else if(this.state.notAuthorized){
      return this.renderNotAuthorized();
    }else {
      return this.renderFound();
    }
  }
}

export default RemoteScreen