import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import { HeaderText, Header2Text } from "../util/Text";

import box from "../../assets/images/material/box.png";

import { PriceUtil } from "../../utils/price";
import { Path, PathGenerator } from "../../constants/path";
import { Link, Button } from "../util/Clickable";

declare var UIkit;

class ConfirmModal extends Component {

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
            if(this.props.title != null){
              return (
                <h2 className="uk-text-center">
                  {this.props.title}
                </h2>  
              );
            }
          })()}
          {(()=>{
            if(this.props.message != null){
              return (
                <p>
                  { this.props.message }
                </p>  
              );
            }
          })()}
          
          <div className="uk-margin uk-flex-center uk-grid-small" {...{'uk-grid':''}}>
            <div className="uk-width-auto">
              <Button className="uk-button uk-button-primary " onClick={(event) => {
                this.closeModal();
                setTimeout( () => {
                  this.props.onClose && this.props.onClose();  
                }, 400);
              }}>
              閉じる
            </Button>
            </div>
            <div className="uk-width-auto">
              <Button className="uk-button uk-button-muted " onClick={(event) => {
                  this.closeModal();
                  setTimeout( () => {
                    this.props.onOK && this.props.onOK();
                  }, 400);
                }}>
                OK
              </Button>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default ConfirmModal;