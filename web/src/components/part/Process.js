import React, { Component } from "react";
import { HeaderText, Header2Text } from "../util/Text";

class Process extends Component {

  render = () => {
    return (
      <div className="uk-position-relative uk-arrow-base">
        <div className={"uk-arrow " + (this.props.step == 0 ? "uk-arrow-active": "") }>
          <div className="uk-padding-small uk-background-muted ">
            <h3 className="uk-text-center uk-margin-remove">
              1
            </h3>
            <div className="uk-text-center">
              <small>
                決済情報の入力
              </small>
            </div> 
          </div>  
        </div>
        <div className={"uk-arrow " + (this.props.step == 1 ? "uk-arrow-active": "") }>
          <div className="uk-padding-small uk-background-muted">
            <h3 className="uk-text-center uk-margin-remove">
              2
            </h3>
            <div className="uk-text-center">
              <small>
                入力情報の確認
              </small>
            </div>  
          </div> 
        </div>
        <div className={"uk-arrow " + (this.props.step == 2 ? "uk-arrow-active": "") }>
          <div className="uk-padding-small uk-background-muted ">
            <h3 className="uk-text-center uk-margin-remove">
              3
            </h3>
            <div className="uk-text-center">
              <small>
                購入完了
              </small>
            </div>
          </div> 
        </div>
      </div>
    );
  }
}

export default Process;