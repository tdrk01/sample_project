import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReactGA from 'react-ga';

import { Motion, spring } from 'react-motion';

import { HeaderText, Header2Text } from "../util/Text";
import { Image } from "../util/Image";
import { Link, Button } from "../util/Clickable";

import { PriceUtil } from "../../utils/price";
import { Path, PathGenerator } from "../../constants/path";
import { getBoxes } from "../../actions/box";

const images = {
  box: require("../../assets/images/gacha/box.png"),
  cover: require("../../assets/images/gacha/cover.png"),
  star: require("../../assets/images/gacha/star.png"),
  smoke: require("../../assets/images/gacha/mokumoku.gif"),
  smoke1: require("../../assets/images/gacha/mokumoku1.gif"),
  smoke2: require("../../assets/images/gacha/mokumoku2.gif"),
  smoke3: require("../../assets/images/gacha/mokumoku3.gif"),
  smoke4: require("../../assets/images/gacha/mokumoku4.gif"),
};

class Gacha extends Component {

  constructor(props) {
    super(props);
    this.state = {
      step: 0
    };
  }

  onClick = () => {
    if( process.env.REACT_APP_GOOGLE_ANALYTICS_TAG != null && process.env.REACT_APP_GOOGLE_ANALYTICS_TAG.length > 0 ){
      ReactGA.event({category: "items_draw", action: "open", label: "",nonInteraction: true});
    }

    this.props.onStart && this.props.onStart();

    setTimeout( () => {
      this.setState({
        step: 1
      });
      this.forceUpdate();
    }, 300);

    setTimeout( () => {
      this.setState({
        step: 2
      });
      this.forceUpdate();
    }, 1600);

    for (var i = 3; i <= 7; i++) {
      setTimeout( () => {
        this.setState({
          step: i
        });
        this.forceUpdate();
      }, 1300 + (i * 300));
    }

    setTimeout( () => {
        this.props.onEnd && this.props.onEnd();
      }, 2700);
  }

  renderBox = () => {
    return (
      <div  className="uk-width-1-1" onClick={this.onClick}>
        <Motion defaultStyle={{top: 0}} style={{top: spring( this.state.step <= 1 ? 0 : 32)}}>
          { interpolatingStyle => 
            <img style={interpolatingStyle} className="uk-width-medium uk-position-absolute" src={images.box} />
          }
        </Motion>

        { (()=>{
          if( this.state.step >= 2 ){
            return (
              <Motion defaultStyle={{opacity: 1}} style={{opacity: spring( this.state.step >= 4 ? 0 : 1)}}>
                { interpolatingStyle => 
                  <div style={interpolatingStyle}>
                    <img style={{top:48}} className="uk-width-medium uk-position-absolute" src={images.smoke} />
                  </div>
                }
              </Motion>
            );
          }
        })() }

        { (()=>{
          if( this.state.step >= 3 ){
            return (
               <Motion defaultStyle={{opacity: 1}} style={{opacity: spring( this.state.step >= 5 ? 0 : 1)}}>
                { interpolatingStyle => 
                  <div style={interpolatingStyle}>
                    <img style={{top:80, left:-32}} className="uk-width-medium uk-position-absolute" src={images.smoke1} />
                  </div>
                }
              </Motion>
            );
          }
        })() }

        <Motion defaultStyle={{top: 0, opacity: 1}} style={{top: spring( this.state.step <= 1 ? 0 : -32), opacity: spring( this.state.step <= 2 ? 1 : 0) }}>
          { interpolatingStyle => 
            <img style={interpolatingStyle} className="uk-width-medium uk-position-absolute" src={
              this.props.images != null && this.props.images.cover != null ? this.props.images.cover : images.cover
            } />
          }
        </Motion>

        { (()=>{
          if( this.state.step >= 4 ){
            return (
              <Motion defaultStyle={{opacity: 1}} style={{opacity: spring( this.state.step >= 6 ? 0 : 1)}}>
                { interpolatingStyle => 
                  <div style={interpolatingStyle}>
                    <img style={{top:64, left:-64}} className="uk-width-medium uk-position-absolute" src={images.smoke4} />
                  </div>
                }
              </Motion>
            );
          }
        })() }

        { (()=>{
          if( this.state.step >= 5 ){
            return (
              <Motion defaultStyle={{opacity: 1}} style={{opacity: spring( this.state.step >= 7 ? 0 : 1)}}>
                { interpolatingStyle => 
                  <div style={interpolatingStyle}>
                    <img style={{top:80, left:64}} className="uk-width-medium uk-position-absolute" src={images.smoke3} />
                  </div>
                }
              </Motion>
            );
          }
        })() }


        { (()=>{
          if( this.state.step >= 6 ){
            return (
              <Motion defaultStyle={{opacity: 1}} style={{opacity: spring( this.state.step >= 7 ? 0 : 1)}}>
                { interpolatingStyle => 
                  <div style={interpolatingStyle}>
                    <img style={{top:48, left:32}} className="uk-width-medium uk-position-absolute" src={images.smoke2} />
                  </div>
                }
              </Motion>
            );
          }
        })() }
      </div>
    );
  }

  render = () => {
    return (
      <div className="uk-width-medium uk-height-medium uk-position-relative">
        <div className={"uk-position-absolute uk-width-1-1 " + ( this.state.step == 1 ? "shake shake-slow shake-constant": "" )}>
          { this.renderBox() }
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
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Gacha);