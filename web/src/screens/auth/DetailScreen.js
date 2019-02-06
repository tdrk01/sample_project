import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Path, ExternalPath } from "../../constants/path"

import Meta from "../../components/layout/Meta";
import { Link, Button } from "../../components/util/Clickable";
import UserDetailForm from "../../components/forms/UserDetailForm";
import { StringUtil } from "../../utils/string";
import { register, setRedirectTo } from "../../actions/auth";
import MessageModal from "../../components/part/MessageModal";

import { Logo } from "../../components/util/Logo";

class DetailScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      message: ""
    };
  }

  toNext = () => {
    if( this.props.auth.redirectTo != null ){
      this.props.history.push(this.props.auth.redirectTo);
    }else{
      this.props.history.push(Path.user.url);
    }
    this.props.actions.setRedirectTo(null);
  }

  onRegister = (values) => {
    var param = Object.assign({}, this.props.auth.tmp, values);

    param["birthday"] = param["birthday"]["year"] + "-" + param["birthday"]["month"] + "-" + param["birthday"]["date"];

    this.props.actions.register( param ).then( ({value, action}) => {
      if(value.status < 300){
        this.registeredModal.openModal();
      }else{
        this.setState({
          message: value.errors != null ? StringUtil.messageFormErrors(value.errors) : value.message
        });
      }
    }).catch( (error) => {
      console.log(error);
    });
  }

  render = () => {
    return (
      <div>
        <Meta title="詳細情報の入力" />
        <div className="uk-section uk-section-large">
          <div className="uk-container uk-container-ssmall">
            <div className="uk-margin-large">
              <div className="uk-text-center uk-margin">
                <Link className="uk-link-reset" to={Path.root.url}>
                  <Logo className="uk-width-medium" />
                </Link>
              </div>
              <h4 className="uk-text-center uk-margin">
                新規登録
              </h4>
            </div>
            <div className="uk-margin">
              <UserDetailForm 
                ref={ (form) => this.form = form } 
                onSubmit={ this.onRegister } 
                message={this.state.message} 
              />
            </div>
            <hr />
            <div className="uk-margin uk-text-center">
              <Link to={Path.auth.register.url}>
                <small>メールアドレスとパスワードの設定に戻る</small>
              </Link>
            </div>
            <MessageModal id="registered-modal" ref={ registeredModal => this.registeredModal = registeredModal } title="会員登録しました" buttonText="続ける" onClose={this.toNext} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
      auth: state.auth
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
      setRedirectTo,
      register: (data) => dispatch( register(data) )
    }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailScreen))