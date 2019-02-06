import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Path, ExternalPath } from "../../constants/path"

import Meta from "../../components/layout/Meta";
import ForgetForm from "../../components/forms/ForgetForm";
import MessageModal from "../../components/part/MessageModal";
import { forget } from "../../actions/auth";
import { Logo } from "../../components/util/Logo";
import { Link, Button } from "../../components/util/Clickable";

class ForgetScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      message: ""
    };
  }

  onSubmit = (values) => {
    this.props.actions.forget(values).then( ({ value, actions }) => {
      if(value.status < 300){
        this.setState({
          message: ""
        });
        this.forgetModal.openModal();
      }else{
        this.setState({
          message: "該当のユーザが存在しません"
        });
      }
    }).catch(error => console.log(error) );
  }

  render = () => {
    return (
      <div>
        <Meta title="パスワードのリセット" />
        <div className="uk-section uk-section-large">
          <div className="uk-container uk-container-ssmall">
            <div className="uk-margin-large">
              <div className="uk-text-center uk-margin">
                <Link className="uk-link-reset" to={Path.root.url}>
                  <Logo className="uk-width-medium" />
                </Link>
              </div>
              <h4 className="uk-text-center uk-margin">
                パスワードのリセット
              </h4>
            </div>
            <div className="uk-margin">
              <ForgetForm onSubmit={ this.onSubmit }
                message={this.state.message}
              />
            </div>
            <hr />
            <div className="uk-margin">
              <div className="uk-text-center uk-margin">
                <Link to={Path.auth.login.url} className="uk-button uk-button-muted">
                  ログインへ戻る
                </Link>
              </div>
            </div>
            <MessageModal id="forget-modal" ref={ forgetModal => this.forgetModal = forgetModal } title="リセットを受け付けました" message="メールアドレスにリセット用リンクを記載したメールを送信しました。" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
      forget: (data) => dispatch(forget(data)),
    }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgetScreen))