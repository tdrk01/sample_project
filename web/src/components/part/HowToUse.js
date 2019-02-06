import React, { Component } from "react";
import { HeaderText, Header2Text } from "../util/Text";

import box from "../../assets/images/icon/box_open.svg";
import enjoy from "../../assets/images/icon/enjoy.svg";
import buy from "../../assets/images/icon/buy.svg";

const howToUses = [
  {
    text: "tamate baco を購入する",
    image: require("../../assets/images/icon/1.png"),
    style: {
      height: "100%",
      width: "100%"
    }
  },{
    text: "tamate baco をあける",
    image: require("../../assets/images/icon/2.png"),
    style: {
      height: "110%",
      width: "100%"
    }
  },{
    text: "ランダムで体験が当たる",
    image: require("../../assets/images/icon/3.png"),
    style: {
      height: "100%",
      width: "105%",
      marginLeft: "-2.5%"
    }
  },{
    text: "出てきた体験へGO！",
    image: require("../../assets/images/icon/4.png"),
    style: {
      height: "100%",
      width: "115%",
      marginLeft: "-7.5%"
    }
  },
];


class HowToUse extends Component {

  render = () => {
    return (
      <div className="uk-flex-center uk-grid-match" {...{'uk-grid': ''}}>
        { 
          howToUses.map( (howToUse, index) => {
            return (
              <div key={index} className="uk-width-1-4@m uk-width-1-2@s">
                <div className="uk-position-relative">
                  <div className="uk-text-center" style={{marginBottom: 56, marginTop: 24}}>
                    <div className="uk-display-inline-block uk-width-medium uk-position-relative">
                      <img style={howToUse.style} className="" src={howToUse.image} />
                    </div>
                  </div>
                  <div className="uk-position-bottom uk-width-1-1">
                    <Header2Text className="uk-text-center">
                      {index + 1}. { howToUse.text }
                    </Header2Text>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default HowToUse;