import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Path, ExternalPath } from "../../constants/path"

import Meta from "../../components/layout/Meta";
import { Link, Button } from "../../components/util/Clickable";
import LoginForm from "../../components/forms/LoginForm";
import { login, setRedirectTo } from "../../actions/auth";
import { Logo } from "../../components/util/Logo";

class LoginScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      message: ""
    };
  }

  onLogin = (values) => {
    this.props.actions.login(values).then( ({ value, actions }) => {
      if(value.status < 300){
        if( this.props.auth.redirectTo != null ){
          this.props.history.push(this.props.auth.redirectTo);
        }else{
          this.props.history.push(Path.user.url);
        }
        this.props.actions.setRedirectTo(null);
      }else{
        this.setState({
          message: value.message
        });
      }
    }).catch(error => console.log(error) );
  }

  render = () => {
    return (
      <div>
        <Meta title="ログイン" />
        <div className="uk-section uk-section-large">
          <div className="uk-container uk-container-ssmall">
            <div className="uk-margin-large">
              <div className="uk-text-center uk-margin">
                <Link className="uk-link-reset" to={Path.root.url}>
                  <Logo className="uk-width-medium" />
                </Link>
              </div>
              <h4 className="uk-text-center uk-margin">
                ログイン
              </h4>
              <div className="uk-text-center uk-margin">
                <Link className="uk-button uk-button-facebook uk-button-with-icon uk-width-1-1 uk-padding-remove" href={ExternalPath.facebook} ga={{category: "login", action: "tap_facebook", label: "",nonInteraction: true}}>
                  <i className="fab fa-facebook"></i>
                  <span>Facebook でログイン</span>
                </Link>
              </div>
            </div>
            <div className="uk-margin">
              <LoginForm onSubmit={ this.onLogin }
                middle={ (
                  <div className="uk-text-center">
                    <Link to={Path.auth.forget.url}>
                      <small>パスワードをお忘れの方はこちら</small>
                    </Link>
                  </div>
                ) }
                message={this.state.message}
              />
            </div>
            <hr />
            <div className="uk-margin">
              <p className="uk-text-center">
                <small>
                  アカウントをお持ちでない方はこちらから
                </small>
              </p>
              <div className="uk-text-center uk-margin">
                <Link to={Path.auth.register.url} className="uk-button uk-button-primary" ga={{category: "login", action: "tap_register", label: "",nonInteraction: true}}>
                  新規登録
                </Link>
              </div>
            </div>
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
      login: (data) => dispatch(login(data))
    }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginScreen))