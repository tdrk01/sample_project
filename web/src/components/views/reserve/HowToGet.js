import React, { Component } from 'react';
import { Link as NativeLink, withRouter } from 'react-router-dom'

import { Link, Button } from "../../util/Clickable";
import { HeaderText } from "../../util/Text";
import { DateUtil } from "../../../utils/date";

class HowToGet extends Component {

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
              ページ下部のフォームより、送付先を入力
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
              受け取り
            </span>
          </div>
        </div>
        <hr />

        <p>
          こちらの商品は弊社から指定の住所に発送させていただきます。<br/>
          ページ下部のフォームより、送付先を入力してください。
        </p>

      </div>
    );
  }
}

export default HowToGet;