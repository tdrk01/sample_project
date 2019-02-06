import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Path } from '../../constants/path';
import { openBoxes } from "../../utils/modal";
import { Logo, LogoIcon } from "../util/Logo";
import { Link, Button } from "../util/Clickable";

declare var UIkit;

class Header extends Component {

  componentDidMount = () => {
    let height = this.props.height ? this.props.height : 0;
    if( this.nav != null ){
      UIkit.sticky(this.nav, {
        'animation': ' uk-animation-slide-top',
        'top' : height, 
        "cls-active": "uk-navbar-sticky",
        "cls-inactive": ( height == 0 ? " uk-navbar-sticky dummy" : "dummy" )
      });
    }
  }

  render = () => {
    let height = this.props.height ? this.props.height : 0;
    return (
      <header>
        <nav ref={nav => this.nav = nav} className={"uk-navbar-container uk-background-white uk-box-shadow-small uk-navbar-sticky"} {...{'uk-navbar':'', 'uk-sticky': 'animation: uk-animation-slide-top; top:'+height+"; cls-active: uk-navbar-sticky; cls-inactive:"+ ( height == 0 ? " uk-navbar-sticky dummy" : "dummy" )+";" }}>
          <div className="uk-navbar-left uk-position-relative">
            <Link className="uk-margin-left@s uk-margin-small-left uk-link-reset" to={Path.root.url} ga={{category: "top", action: "tap_logo", label: "header",nonInteraction: true}}>
              <Logo className="uk-width-mmedium@s uk-width-small" style={{marginTop: "-6px"}} />
            </Link>
          </div>

          <div className="uk-navbar-right uk-hidden@s">
            <div className="uk-margin-small-right">
              <Button className="uk-button uk-button-primary uk-padding-small uk-padding-remove-vertical uk-button-small" onClick={ () => openBoxes() } ga={{category: "top_button", action: "tap_present", label: "header",nonInteraction: true}}>
                プレゼント
              </Button>
            </div>
            <div className="uk-margin-small-right">
              <Button className="uk-button uk-button-primary uk-padding-small uk-padding-remove-vertical uk-button-small" onClick={ () => openBoxes() } ga={{category: "top_button", action: "tap_myself", label: "header",nonInteraction: true}}>
                自分でやる
              </Button>
            </div>
          </div>

          <div className="uk-navbar-right uk-visible@s">
            <div className="uk-margin-small-right">
              <Button className="uk-button uk-button-primary" onClick={ () => openBoxes() } ga={{category: "top_button", action: "tap_present", label: "header",nonInteraction: true}} style={{width: 200}}>
                プレゼントする
              </Button>
            </div>
            <div className="uk-margin-small-right">
              <Button className="uk-button uk-button-primary" onClick={ () => openBoxes() } ga={{category: "top_button", action: "tap_myself", label: "header",nonInteraction: true}} style={{width: 200}}>
                自分でやる
              </Button>
            </div>
          </div>

        </nav>
      </header>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
