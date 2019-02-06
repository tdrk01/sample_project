import React, { Component } from 'react';
import { Route as NRoute, Redirect, withRouter } from 'react-router-dom'
import { Path } from '../../constants/path'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Route extends Component {

  render = () => {
    let { component: Component, children, auth, ...rest } = this.props;
    return (
      <NRoute {...rest} render={ props => {
        if( true ) {
          return (
            <Component {...props}/>
          );
        }else{
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
  };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
    }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Route))