import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom'
import { Path } from '../../constants/path'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { setRedirectTo, setAuthDate } from "../../actions/auth";

class PrivateRoute extends Component {

  isExpired = ( date ) => {
    if( date != null ){
      var logined = new Date(date);
      logined.setDate( logined.getDate() + 1 );
      var loginedTimestamp = logined.getTime();
      if(loginedTimestamp >= (new Date()).getTime()){
        return false;
      }
    }
    this.setRedirectTo();
    this.props.actions.setAuthDate(null, null);
    return true;
  }

  setRedirectTo = () => {
    this.props.actions.setRedirectTo(this.props.history.location.pathname);
  }

  render = () => {
    let { component: Component, auth, ...rest } = this.props;
    return (
      <Route {...rest} render={ props => {
        if(auth.auth_token != null && !this.isExpired( auth.login_date ) ) {
          return (
            <Component {...props}/>
          );
        }else{
          this.setRedirectTo();
          return (
            <Redirect to={{
              pathname: Path.auth.register.url,
              state: { from: props.location }
            }}/>
          );
        }
      }}/>
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
      setRedirectTo, setAuthDate
    }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRoute))