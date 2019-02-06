import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Link, Button } from "../util/Clickable";
import { HeaderText, Header2Text } from "../util/Text";
import { PriceUtil } from "../../utils/price";
import { Path, PathGenerator } from "../../constants/path";
import { getBoxes } from "../../actions/box";
import { Image } from "../util/Image";

declare var UIkit;

class CampaignModal extends Component {

  openModal = () => {
    UIkit.modal("#campaign-modal").show(); 
  }

  closeModal = () => {
    UIkit.modal("#campaign-modal").hide(); 
  }

  render = () => {
    return (
      <div id="campaign-modal" className="uk-flex-top" {...{'uk-modal': 'esc-close:false; container:false;'}}>
        <div className="uk-modal-dialog uk-modal-dialog-small uk-margin-auto-vertical uk-border-rounded">
          <Button className="uk-modal-close-default uk-border-circle uk-background-white" type="button" {...{'uk-close': ''}} ga={{category: "top_modal", action: "close", label: "",nonInteraction: true}}></Button>

          <div className="uk-padding uk-background-gradient">
            <h2 className="uk-text-center uk-margin-remove uk-text-white">
              『#偉人と過ごす休日』
            </h2>
          </div>
          <div className="uk-modal-body">
            <HeaderText className="uk-h3 pink">
              キャンペーン詳細
            </HeaderText>
            <p>
              『#偉人と過ごす休日』が当たるガチャ「オタメシばこ」をあけてみよう！友達にプレゼントすることもできるよ！結果をシェアしてクーポンコードをゲットしよう！
            </p>
            <HeaderText className="uk-h3 uk-margin-large-top pink">
              クーポンコードのもらい方
            </HeaderText>
            <ol>
              <li>
                <p>
                  tamate baco「オタメシばこ」を回す<br/>
                  <small className="uk-text-muted">※オタメシばこを開けるには登録が必要です</small>
                </p>
              </li>
              <li className="uk-text-small">
                <p>
                当たった『#偉人と過ごす休日』をTwitter or Facebookでシェア
                </p>
              </li>
              <li className="uk-text-small">
                <p>
                  詳細画面にクーポンコードが表示されます
                </p>
              </li>
            </ol>
            <div className="uk-text-center uk-margin-small">
              <Link target="_blank" to={ Path.others.help.url + "#category__2" }>
                <small>クーポンコードの使い方？</small>
              </Link>
            </div>
            <div className="uk-text-center uk-margin">
              <Button className="uk-button uk-button-pink uk-padding-remove uk-width-medium" onClick={() => {
                this.closeModal();
                setTimeout( () => {
                  this.props.onClick && this.props.onClick();
                }, 400);
              }}>
                オタメシばこをあける！
              </Button>
            </div>
            
          </div>
        </div>
      </div>
    );
  }
}


export default CampaignModal;