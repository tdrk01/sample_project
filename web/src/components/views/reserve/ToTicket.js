import React, { Component } from 'react';
import { Link as NativeLink, withRouter } from 'react-router-dom'

import { Link, Button } from "../../util/Clickable";
import { HeaderText } from "../../util/Text";
import { DateUtil } from "../../../utils/date";

class ToTicket extends Component {

  render = () => {
    return (
      <div>
        <HeaderText>
          チケットページ
        </HeaderText>
        
        <p>
          下記リンク先のチケットページを体験先のスタッフに見せてください。
        </p>

        <div className="uk-margin">
          <Link to={this.props.detailLink} className="uk-button uk-button-accent uk-width-1-1" ga={{category: "items_detail", action: "tap_ticket", label: "",nonInteraction: true}}>
            チケットページを開く
          </Link>
        </div> 
      </div>
    );
  }
}

export default ToTicket;