import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import { HeaderText, Header2Text } from "../util/Text";

import { PriceUtil } from "../../utils/price";
import { Path, PathGenerator } from "../../constants/path";
import { Image } from "../../components/util/Image";
import { Link, Button } from "../util/Clickable";

declare var UIkit;

class UseModal extends Component {

  openModal = () => {
    UIkit.modal("#"+this.props.id).show(); 
  }

  closeModal = () => {
    UIkit.modal("#"+this.props.id).hide(); 
  }

  render = () => {
    return (
      <div id={this.props.id} className="uk-flex-top" {...{'uk-modal': ' container:false;'}}>
        <div className="uk-modal-dialog uk-modal-dialog-small uk-modal-body uk-margin-auto-vertical uk-background-muted uk-border-rounded">
          <h3 className="uk-text-center">
            チケットを利用済みにする
          </h3>
          <p className="uk-text-center uk-margin-remove">
            1度チケットを利用すると、再度このチケットは利用できなくなります。
          </p>
          <div className="uk-margin uk-grid-small uk-child-width-1-2" {...{'uk-grid': ''}}>
            <div>
              <Button className="uk-button uk-button-muted uk-padding-remove uk-width-1-1" onClick={(event) => {
                this.closeModal();
              }}
              ga={{category: "items_ticket_modal", action: "tap_cancel", label: "",nonInteraction: true}}
              >
                キャンセル
              </Button>
            </div>
            <div>
              <Button className="uk-button uk-button-primary uk-padding-remove uk-width-1-1" onClick={(event) => {
                this.closeModal();
                setTimeout( () => {
                  this.props.onUse(event);
                }, 400);
              }}
              ga={{category: "items_ticket_modal", action: "tap_used", label: "",nonInteraction: true}}
              >
                利用済みにする
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UseModal;