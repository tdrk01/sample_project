import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Path } from "../../constants/path";

import top from "../../assets/images/material/top.jpg"
import { openBoxes } from "../../utils/modal";
import { LogoB } from "../util/Logo";
import { Link, Button } from "../util/Clickable";

import Image from "react-simple-image";

const backgrounds = [
  {
    small: require("../../assets/images/background/1_1x.jpg"), 
    large: require("../../assets/images/background/1_2x.jpg"), 
  },{
    small: require("../../assets/images/background/2_1x.jpg"), 
    large: require("../../assets/images/background/2_2x.jpg"), 
  },{
    small: require("../../assets/images/background/3_1x.jpg"), 
    large: require("../../assets/images/background/3_2x.jpg"), 
  },{
    small: require("../../assets/images/background/4_1x.jpg"), 
    large: require("../../assets/images/background/4_2x.jpg"), 
  },{
    small: require("../../assets/images/background/5_1x.jpg"), 
    large: require("../../assets/images/background/5_2x.jpg"), 
  },{
    small: require("../../assets/images/background/6_1x.jpg"), 
    large: require("../../assets/images/background/6_2x.jpg"), 
  }
];

class TopSlider extends Component {
  render() {
    return (
      <div>
        <div className="uk-width-1-1 uk-position-relative">
          <div className="uk-position-relative uk-visible-toggle uk-light" {...{'uk-slideshow': 'animation: fade; autoplay: true; autoplay-interval:5000; velocity: 0.1;'}}>
            <ul className="uk-slideshow-items" {...{"uk-height-viewport": "offset-top: true; offset-bottom: 30; min-height: 400;"}}>
              {
                backgrounds.map( (background, key) => {
                  return (
                    <li key={key}>
                      <div className="uk-image-wrapper uk-height-1-1 uk-background-white">
                        <Image
                          alt=''
                          src={background.small}
                          srcSet={{
                            '1024w': background.small,
                            '8192w': background.large,
                          }}
                        />
                      </div>
                    </li>
                  );
                })
              }
            </ul>
          </div>

          <div className="uk-position-cover uk-overlay-primary">
          </div>
          <div className="uk-position-center uk-position-small">
            <div className="uk-margin-large uk-text-center uk-light">
              <h2 className="uk-h3 uk-text-white">
                週末の予定は、ガチャで決めよう。
              </h2>
              <LogoB className="uk-width-xxlarge@s uk-width-large" />
            </div> 
            <div className="uk-grid-small uk-flex-center" {...{'uk-grid': ''}}>
              <div className="uk-width-1-2">
                <Button className="uk-button uk-button-primary uk-button-large uk-width-1-1 uk-padding-remove"
                  onClick={() => openBoxes() } ga={{category: "top_button", action: "tap_present", label: "main_image",nonInteraction: true}}
                >
                  プレゼントする
                </Button>
              </div>
              <div className="uk-width-1-2">
                <Button className="uk-button uk-button-primary uk-button-large uk-width-1-1 uk-padding-remove"
                  onClick={() => openBoxes() } ga={{category: "top_button", action: "tap_myself", label: "main_image",nonInteraction: true}}
                >
                  自分でやる
                </Button>
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
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
    }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopSlider))