import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Meta from "../../components/layout/Meta";
import { Path, ExternalPath } from "../../constants/path"
import LoginForm from "../../components/forms/LoginForm";
import { logout } from "../../actions/auth";
import { Logo } from "../../components/util/Logo";
import { Link, Button } from "../../components/util/Clickable";

class LogoutScreen extends Component {

  componentDidMount = () => {
    this.props.actions.logout();
  }

  render = () => {
    return (
      <div>
        <Meta title="ログアウト" />
        <div className="uk-section uk-section-large">
          <div className="uk-container uk-container-ssmall uk-position-relative uk-height-large">

            <div className="uk-position-center">
              <div className="uk-margin uk-text-center">
                <Logo className="uk-width-medium" />
              </div>
              <h1 className="uk-text-center">
                ログアウトしました
              </h1>
              <p className="uk-text-center">
                またのご利用をお待ちしております
              </p>
              <div className="uk-text-center uk-margin">
                <Link to={Path.root.url} className="uk-button uk-button-muted">
                  トップページへ戻る
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
      logout: () => dispatch(logout())
    }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogoutScreen))