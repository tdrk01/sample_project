import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Immutable from "immutable";

import { getPurchase, draw } from "../../actions/purchase";
import { setRedirectTo } from "../../actions/auth";

import Meta from "../../components/layout/Meta";
import RemoteScreen from "../RemoteScreen";
import ResultModal from "../../components/part/ResultModal";
import LoginModal from "../../components/part/LoginModal";

import { Link, Button } from "../../components/util/Clickable";
import { Image } from "../../components/util/Image";
import { HeaderText } from "../../components/util/Text";
import { Path, PathGenerator } from '../../constants/path'
import { PurchaseStatus } from "../../constants/status";

import Gacha from "../../components/part/Gacha";

class DrawScreen extends RemoteScreen {
  
  constructor(props) {
    super(props);
    this.state = {
      purchase: {},
      hash: "",
      notFound: false,
      message: "",
      drawn: false,
      checked: false
    };
  }

  componentDidMount = () => {
    var hash = this.props.match.params.hash;
    this.props.actions.getPurchase(hash).then( ({value, action}) => {
      if(value.status < 300){
        this.setState( Immutable.fromJS(this.state)
          .updateIn(["purchase"], v => value.data )
          .updateIn(["hash"], v => hash )
          .updateIn(["message"], v => "" )
          .updateIn(["drawn"], v => false )
          .updateIn(["checked"], v => value.data.content != null )
          .toJS()
        );
      }else{
        this.didNotFound();
      }
    }).catch( error => console.log(error) );
  }

  onDraw = () => {
    this.props.actions.draw( this.state.hash ).then( ({value, action}) => {
      if(value.status < 300){
        this.setState( Immutable.fromJS(this.state)
          .updateIn(["purchase"], v => value.data )
          .updateIn(["message"], v => "" )
          .updateIn(["drawn"], v => true )
          .updateIn(["checked"], v => true )
          .toJS()
        );
      }else if(value.status == 403){
        this.setState( Immutable.fromJS(this.state)
          .updateIn(["message"], v => "このtamate bacoは既に他のユーザが開封しています。\n心あたりのない場合はページ下部のお問い合わせより運営部にご連絡ください。" )
          .updateIn(["drawn"], v => false )
          .updateIn(["checked"], v => true )
          .toJS()
        );
      }else{
        this.setState( Immutable.fromJS(this.state)
          .updateIn(["message"], v => value.message )
          .updateIn(["drawn"], v => false )
          .updateIn(["checked"], v => true )
          .toJS()
        );
      }
    }).catch( error => console.log(error) );
  }

  onCannotDraw = () => {
    this.setState( Immutable.fromJS(this.state)
      .updateIn(["message"], v => "このtamate bacoは既に他のユーザが開封しています。\n心あたりのない場合はページ下部のお問い合わせより運営部にご連絡ください。" )
      .toJS()
    );
  }

  onCanceled = () => {
    this.setState( Immutable.fromJS(this.state)
      .updateIn(["message"], v => "このtamate bacoは有効期限が切れたかキャンセルされたため開封できません。" )
      .toJS()
    );
  }

  onRedirectLogin = () => {
    this.props.actions.setRedirectTo(this.props.history.location.pathname);
    this.loginModal.openModal();
  }

  onShowResult = () => {
    if( !this.state.drawn && this.state.checked ){
      return;
    }
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
    this.props.history.push( PathGenerator.item("detail", this.state.hash) );
  }

  renderFound = () => {
    return (
      <div>
        <Meta title="tamate bacoを開けよう" />
        { (()=>{
          if(this.state.purchase.id != null){
            return (
              <div className="uk-section uk-section-large">
                <div className="uk-container uk-container-ssmall uk-height-xlarge uk-position-relative">

                  <div className="uk-position-center">
                    <HeaderText>
                      tamate bacoを開けよう
                    </HeaderText>

                    <div className="uk-margin uk-text-center">
                      <div className="uk-display-inline-block uk-width-medium uk-text-left">
                        { ( () => {
                          if( this.props.auth.auth_token == null ){
                            return (
                              <div className="uk-text-center" onClick={this.onRedirectLogin}>
                                <Image className="uk-width-medium" src={this.state.purchase.box.image_url} />
                              </div>
                            );
                          } else if( this.state.purchase.reciever_id != null && this.state.purchase.reciever_id != this.props.auth.userId ){
                            return (
                              <div className="uk-text-center" onClick={this.onCannotDraw}>
                                <Image className="uk-width-medium" src={this.state.purchase.box.image_url} />
                              </div>
                            );
                          } else if( this.state.purchase.status == PurchaseStatus.CANCELED ){
                            return (
                              <div className="uk-text-center" onClick={this.onCanceled}>
                                <Image className="uk-width-medium" src={this.state.purchase.box.image_url} />
                              </div>
                            );
                          }else {
                            return (
                              <Gacha onStart={this.onDraw} onEnd={this.onShowResult} images={{
                                all: this.state.purchase.box.image_url
                              }} />
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
                      <Link target="_blank" href={ Path.root.url +"#whats"} ga={{category: "items_draw", action: "tap_about", label: "",nonInteraction: true}}>
                        tamate bacoとは？
                      </Link>
                    </div>
                  </div>

                  <ResultModal ref={modal => this.modal = modal} id="result-modal" content={this.state.purchase.content} onShowDetail={this.onShowDetail} />

                  <LoginModal ref={loginModal => this.loginModal = loginModal} id="login-modal" onClick={this.onLoginClick} />

                </div>
              </div>
            );
          }
        })()}
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
      getPurchase: (hash) => dispatch(getPurchase(hash)),
      draw: (hash) => dispatch(draw(hash))
    }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DrawScreen))