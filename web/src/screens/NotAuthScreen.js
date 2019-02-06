import React, { Component } from 'react';
import { Path } from '../constants/path'

import Meta from "../components/layout/Meta";
import sorry from "../assets/images/material/sorry.png";
import kame from "../assets/images/material/kame.png";
import { Logo } from "../components/util/Logo";
import { HeaderText } from "../components/util/Text";

import { Link, Button } from "../components/util/Clickable";

class NotAuthScreen extends Component {
  render = () => {
    return (
      <div>
        <Meta title="403" />
        <div className="uk-section uk-section-large">
          <div className="uk-container uk-container-ssmall uk-position-relative uk-height-xlarge">

            <div className="uk-position-center">
              <div className="uk-text-center">
                <img src={sorry} className="uk-width-medium" />
              </div>
              <HeaderText>
                403 NOT AUTHORIZED
              </HeaderText>

              <p className="uk-text-center">
                申し訳ございません<br/>
                お探しのページはアクセスできません
              </p>

              <div className="uk-margin uk-text-center">
                <img src={kame} className="uk-width-large" />
              </div>
              <div className="uk-margin-large uk-text-center">
                <div className="uk-margin-small">
                  <Link to={Path.auth.login.url} className="uk-button uk-button-primary uk-button-width-medium">
                      別ユーザでログインする
                  </Link>
                </div>
                <div className="uk-margin-small">
                  <Link to={Path.root.url} className="uk-button uk-button-primary uk-button-width-medium">
                      トップページへ戻る
                  </Link>
                </div>
              </div>
            
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default NotAuthScreen