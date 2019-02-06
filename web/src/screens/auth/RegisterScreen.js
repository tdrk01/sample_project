import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Immutable } from "immutable";

import Meta from "../../components/layout/Meta";
import { Path, ExternalPath } from "../../constants/path"
import RegiterForm from "../../components/forms/RegiterForm";
import { setTmpData } from "../../actions/auth";
import { Logo } from "../../components/util/Logo";
import { Link, Button } from "../../components/util/Clickable";

import MessageModal from "../../components/part/MessageModal";

class RegisterScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      message: "",
      notifyMessage: "",
      notifyTitle: ""
    };
  }

  componentWillMount = () => {
    if( this.props.auth.redirectTo != null ){
      if( this.props.auth.redirectTo.indexOf(Path.samples.url) !== -1 ){
        this.setState({
          message: "",
          notifyTitle: "会員登録",
          notifyMessage: "オタメシばこを引くには会員登録が必要です"
        });
      }else if( this.props.auth.redirectTo.indexOf(Path.purchase.url) !== -1 ){
        this.setState({
          message: "",
          notifyTitle: "会員登録",
          notifyMessage: "tamate bacoを購入するには会員登録が必要です"
        });
      }
    }
  }

  componentDidMount = () => {
    if(this.state.notifyMessage != null && this.state.notifyMessage.length > 0){
      this.messageModal.openModal();
    }
  }

  onRegister = (values) => {
    this.props.actions.setTmpData(values);
    this.props.history.push(Path.auth.detail.url);
  }

  render = () => {
    return (
      <div>
        <Meta title="新規登録" />
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
              <div className="uk-text-center uk-margin">
                <Link className="uk-button uk-button-facebook uk-button-with-icon uk-width-1-1 uk-padding-remove" href={ExternalPath.facebook} ga={{category: "register", action: "tap_facebook", label: "",nonInteraction: true}}>
                  <i className="fab fa-facebook"></i>
                  <span>Facebook で新規登録</span>
                </Link>
              </div>
            </div>
            <div className="uk-margin">
              <RegiterForm onSubmit={ this.onRegister } message={this.state.message} />
            </div>
            <p className="uk-text-muted">
              <small>
                アカウントを作成すると、<Link target="_blank" to={Path.others.term.url}>利用規約</Link>およびCookieの使用を含む<Link target="_blank" to={Path.others.privacy.url}>プライバシーポリシー</Link>に同意したことになります。
                </small>
            </p>
            <hr />
            <div className="uk-margin">
              <p className="uk-text-center">
                <small>
                  アカウントをお持ちの方はこちらから
                </small>
              </p>
              <div className="uk-text-center uk-margin">
                <Link to={Path.auth.login.url} className="uk-button uk-button-primary" ga={{category: "register", action: "tap_login", label: "",nonInteraction: true}}>
                  ログイン
                </Link>
              </div>
            </div>
          </div>

          <MessageModal id="message-modal" ref={ messageModal => this.messageModal = messageModal } title={this.state.notifyTitle} message={this.state.notifyMessage} />
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
      setTmpData: (data) => dispatch(setTmpData(data))
    }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterScreen))