import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import { HeaderText, Header2Text } from "../util/Text";

import { Link, Button } from "../util/Clickable";
import { PriceUtil } from "../../utils/price";
import { Path, ExternalPath, PathGenerator } from "../../constants/path";
import { Image } from "../../components/util/Image";

declare var UIkit;

class LoginModal extends Component {

  openModal = () => {
    UIkit.modal("#"+this.props.id).show(); 
  }

  closeModal = () => {
    UIkit.modal("#"+this.props.id).hide(); 
  }

  render = () => {
    return (
      <div id={this.props.id} className="uk-flex-top" {...{'uk-modal': 'esc-close:false; bg-close: false; container:false;'}}>
        <div className="uk-modal-dialog uk-modal-dialog-small uk-modal-body uk-margin-auto-vertical uk-background-muted uk-border-rounded">
          <Button className="uk-modal-close-default uk-border-circle uk-background-white" type="button" {...{'uk-close': ''}}></Button>
          <h3 className="uk-text-center">
            tamate bacoを開けるには<br/>
            会員登録が必要です
          </h3>
          <div className="uk-margin">
            <Link className="uk-button uk-button-facebook uk-button-with-icon uk-padding-remove uk-width-1-1"
              href={ExternalPath.facebook}
            >
              <i className="fab fa-facebook"></i>
              <span>Facebookログインで開ける</span>
            </Link>
          </div>

          <div className="uk-margin">
            <Button className="uk-button uk-button-primary uk-width-1-1" 
            onClick={(event) => {
              this.closeModal();
              setTimeout( () => {
                this.props.onClick(0);
              }, 400);
            }}>
              会員登録して開ける
            </Button>
          </div>

          <div className="uk-margin">
            <Button className="uk-button uk-button-muted uk-width-1-1"
              onClick={(event) => {
              this.closeModal();
              setTimeout( () => {
                this.props.onClick(1);
              }, 400);
            }}>
              ログインして開ける
            </Button>
          </div>

        </div>
      </div>
    );
  }
}

export default LoginModal;