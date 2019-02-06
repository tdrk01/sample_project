import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import { HeaderText, Header2Text } from "../util/Text";

import { PriceUtil } from "../../utils/price";
import { Path, PathGenerator } from "../../constants/path";
import { Image } from "../../components/util/Image";

import { Link, Button } from "../util/Clickable";

declare var UIkit;

class ResultModal extends Component {

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
          {(()=>{
            if( this.props.content != null ){
              return (
                <div>
                  <h2 className="uk-text-center">
                    おめでとうございます！
                  </h2>
                  <div className="uk-margin-large uk-text-center">
                    {(()=>{
                      if( this.props.content.content_images.length > 0 ){
                        return (
                          <div className="uk-margin">
                            <Image className="uk-width-medium uk-border-rounded" src={this.props.content.content_images[0].image_url } />
                          </div>
                        );
                      }
                    })()}
                    <div className="uk-margin">
                      <h1 className="uk-margin-small uk-text-primary">
                        {this.props.content.title}
                      </h1>
                      <p className="uk-margin-small">
                        が当たりました！
                      </p>
                    </div>
                  </div>
                </div>
              );
            }else{
              return (
                <div className="uk-margin uk-text-center">
                  <div className="uk-display-inline-block" uk-spinner="ratio: 2"></div>
                </div>
              );
            }
          })()}
          <div className="uk-margin uk-text-center">
            <Button className="uk-button uk-button-primary" onClick={(event) => {
              this.closeModal();
              setTimeout( () => {
                this.props.onShowDetail(event);
              }, 400);
            }} ga={{category: "items_draw_modal", action: "tap_detail", label: "",nonInteraction: true}}
            >
              詳細を見る
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default ResultModal;