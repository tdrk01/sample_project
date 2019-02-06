import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Immutable from "immutable";

import { drawSample } from "../../actions/sample";
import { setRedirectTo } from "../../actions/auth";

import Meta from "../../components/layout/Meta";
import SampleResultModal from "../../components/part/SampleResultModal";
import LoginModal from "../../components/part/LoginModal";

import { Link, Button } from "../../components/util/Clickable";
import { Image } from "../../components/util/Image";
import { HeaderText } from "../../components/util/Text";
import { Path, PathGenerator } from '../../constants/path'
import { PurchaseStatus } from "../../constants/status";

import Gacha from "../../components/part/Gacha";

import ijin_box from "../../assets/images/gacha/ijin_box.png";
import ijin_cover from "../../assets/images/gacha/ijin_cover.png";

class SampleDrawScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      sample: {},
      message: "",
      drawn: false,
      checked: false
    };
  }

  componentDidMount = () => {
  }

  onDraw = () => {
    this.props.actions.drawSample( ).then( ({value, action}) => {
      if(value.status < 300){
        this.setState( Immutable.fromJS(this.state)
          .updateIn(["sample"], v => value.data )
          .updateIn(["message"], v => "" )
          .updateIn(["drawn"], v => true )
          .updateIn(["checked"], v => true )
          .toJS()
        );
      }else{
        this.setState( Immutable.fromJS(this.state)
          .updateIn(["sample"], v => value.message )
          .updateIn(["drawn"], v => false )
          .updateIn(["checked"], v => true )
          .toJS()
        );
      }
    }).catch( error => console.log(error) );
  }

  onRedirectLogin = () => {
    this.props.actions.setRedirectTo(this.props.history.location.pathname);
    this.loginModal.openModal();
  }

  onShowResult = () => {
    this.modal.openModal();
  }

  onLoginClick = (mode) => {
    if(mode == 0){
      this.props.history.push(Path.auth.register.url);
    }else{
      this.props.history.push(Path.auth.login.url);
    }
  }

  onShowDetail = (event) => {
    this.props.history.push( PathGenerator.sample(this.state.sample.id) );
  }

  render = () => {
    return (
      <div>
        <Meta title="オタメシばこを開けよう" />
        <div className="uk-section uk-section-large">
          <div className="uk-container uk-container-ssmall uk-height-xlarge uk-position-relative">

            <div className="uk-position-center">
              <HeaderText>
                オタメシばこを開けよう
              </HeaderText>

              <div className="uk-margin uk-text-center">
                <div className="uk-display-inline-block uk-width-medium uk-text-left">
                  { ( () => {
                    if( this.props.auth.auth_token == null ){
                      return (
                        <div className="uk-text-center" onClick={this.onRedirectLogin}>
                          <img className="uk-width-medium" src={ijin_box} />
                        </div>
                      );
                    }else {
                      return (
                        <Gacha images={{cover: ijin_cover }} onStart={this.onDraw} onEnd={this.onShowResult}/>
                      )
                    }
                  } )() }
                </div>
              </div>

              {(()=>{
                if(this.state.message.length != 0){
                  return (
                    <p className="uk-text-center uk-text-danger">
                      {
                        this.state.message
                      }
                    </p>
                  );
                }
              })()}
              <div className="uk-margin uk-text-center">
                <span {...{'uk-icon': 'icon: arrow-up;'}}>
                </span>
                <span {...{'uk-icon': 'icon: arrow-up;'}}>
                </span>
                <span {...{'uk-icon': 'icon: arrow-up;'}}>
                </span>
              </div>
              <h1 className="uk-text-center uk-margin">
                タップして開ける
              </h1>
              <div className="uk-margin uk-text-center">
                <Link target="_blank" href={ Path.root.url +"#whats"} ga={{category: "samples_draw", action: "tap_about", label: "",nonInteraction: true}}>
                  tamate bacoとは？
                </Link>
              </div>
            </div>

            {(()=>{
              if( this.state.sample.id != null ){
                return (
                  <SampleResultModal ref={modal => this.modal = modal} id="result-modal" content={this.state.sample} onShowDetail={this.onShowDetail} />
                );
              }
            })()}

            <LoginModal ref={loginModal => this.loginModal = loginModal} id="login-modal" onClick={this.onLoginClick} />

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
      auth: state.auth,
      user: state.user,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
      setRedirectTo,
      drawSample: () => dispatch(drawSample())
    }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SampleDrawScreen))