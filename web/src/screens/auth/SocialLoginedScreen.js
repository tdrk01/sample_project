import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Meta from "../../components/layout/Meta";
import { Path, ExternalPath } from "../../constants/path"
import { setRedirectTo, setAuthDate } from "../../actions/auth";
import { getUser, setUser } from "../../actions/user";

class SocialLoginedScreen extends Component {

  componentDidMount = () => {
    this.props.actions.setAuthDate(
      +this.props.match.params.userId,
      this.props.match.params.token,
    );

    this.props.actions.getUser( +this.props.match.params.userId ).then( ({ value, action }) => {
      if(value.status < 300){
        this.props.actions.setUser( value.data );
        if( this.props.auth.redirectTo != null ){
          this.props.history.push(this.props.auth.redirectTo);
        }else{
          this.props.history.push(Path.user.url);
        }
        this.props.actions.setRedirectTo(null);
      }else{
        this.props.history.push(Path.login.url);
      }
    }).catch( error => {
      this.props.history.push(Path.login.url);
    });
  }

  render = () => {
    return null;
  }
}

const mapStateToProps = state => {
    return {
      auth: state.auth
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
      setRedirectTo, setAuthDate,
      getUser: (userId) => dispatch( getUser(userId) ), 
      setUser
    }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SocialLoginedScreen))