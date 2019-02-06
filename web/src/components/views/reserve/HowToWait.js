import React, { Component } from 'react';
import { Link as NativeLink, withRouter } from 'react-router-dom'

import { Link, Button } from "../../util/Clickable";
import { HeaderText } from "../../util/Text";
import { DateUtil } from "../../../utils/date";
import { Path } from "../../../constants/path";

class HowToWait extends Component {

  render = () => {
    return (
      <div>
        <HeaderText>
          体験の流れ
        </HeaderText>

        <div className="uk-margin" {...{'uk-grid':''}}>
          <div className="uk-width-auto">
            <span className="uk-text-bold uk-text-accent">
              1.
            </span>
          </div>
          <div className="uk-width-expand">
            <span className="uk-text-bold">
              弊社(株式会社TODOROKI)からのメール/電話で日程を調整する
            </span>
          </div>
        </div>

        <div className="uk-margin" {...{'uk-grid':''}}>
          <div className="uk-width-auto">
            <span className="uk-text-bold uk-text-accent">
              2.
            </span>
          </div>
          <div className="uk-width-expand">
            <span className="uk-text-bold">
              メール/電話の指示に従いチケットを受け取る
            </span>
          </div>
        </div>

        <div className="uk-margin" {...{'uk-grid':''}}>
          <div className="uk-width-auto">
            <span className="uk-text-bold uk-text-accent">
              3. 
            </span>
          </div>
          <div className="uk-width-expand">
            <span className="uk-text-bold">
              受け取ったチケットをもって体験先へ
            </span>
          </div>
        </div>

        <hr />

        <p>
          2~3営業日以内を目処に弊社担当者から予約日程およびチケットの受け取り方法についてご連絡させていただきます。<br/>
          万が一弊社から連絡がない場合、お手数ですが<Link to={Path.others.contact.url}>お問い合わせフォーム</Link>よりご一報いただけますと幸いです。
        </p>
      </div>
    );
  }
}

export default HowToWait;