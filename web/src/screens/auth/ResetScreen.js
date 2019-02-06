import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Path, ExternalPath } from "../../constants/path"

import Meta from "../../components/layout/Meta";
import ResetForm from "../../components/forms/ResetForm";
import MessageModal from "../../components/part/MessageModal";
import { reset } from "../../actions/auth";
import { Logo } from "../../components/util/Logo";
import { Link, Button } from "../../components/util/Clickable";

class ResetScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      message: "",
      token: ""
    };
  }

  onSubmit = (values) => {

    var params = Object.assign( {}, values, { token: this.props.match.params.token } );

    this.props.actions.reset(params).then( ({ value, actions }) => {
      if(value.status < 300){
        this.setState({
          message: ""
        });
        this.resetModal.openModal();
      }else{
        this.setState({
          message: "該当のユーザが存在しません"
        });
      }
    }).catch(error => console.log(error) );
  }

  onClose = () => {
    this.props.history.push(Path.auth.login.url);
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
              <ResetForm onSubmit={ this.onSubmit }
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
            <MessageModal id="reset-modal" ref={ resetModal => this.resetModal = resetModal } title="パスワードがリセットされました" message="新しいパスワードでログイン再度ログインしてください。" 
              onClose={this.onClose}
            />
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
      reset: (data) => dispatch(reset(data)),
    }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResetScreen))