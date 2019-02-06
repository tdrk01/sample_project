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

class BoxesModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      boxes:[]
    };
  }

  componentDidMount = () => {
    this.props.actions.getBoxes().then( ({value, action}) => {
      if(value.status < 300){
        this.setState( {
          boxes: value.data
        });
      }
    }).catch(error => console.log(error))
  }

  closeModal = () => {
    UIkit.modal("#boxes-modal").hide(); 
  }

  render = () => {
    return (
      <div id="boxes-modal" className="uk-flex-top" {...{'uk-modal': 'esc-close:false; container:false;'}}>
        <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical uk-background-muted uk-border-rounded">
          <Button className="uk-modal-close-default uk-border-circle uk-background-white" type="button" {...{'uk-close': ''}} ga={{category: "top_modal", action: "close", label: "",nonInteraction: true}}></Button>
          <h3 className="uk-text-center">
            コースを選んでください
          </h3>
          <div className="uk-grid-small uk-flex-center" {...{'uk-grid':''}}>
            {
              this.state.boxes.map( (box, index) => {
                return (
                  <div key={index} className="uk-width-large@m uk-position-relative">
                    <div className="uk-padding-small uk-background-white">
                      <h3 className="uk-margin-remove uk-header-marked uk-header-marked-left gray uk-text-primary uk-text-bold">
                        {box.name}
                      </h3>

                      <h5 className="uk-margin-remove uk-text-primary">
                        {"¥ "+ PriceUtil.putComma(box.price) }
                        {(()=>{
                          if( box.remarked != null ){
                            return (
                              <small className="uk-margin-small-left uk-text-muted">
                                {box.remarked}
                              </small>
                            );
                          }
                        })()}
                      </h5>
                    </div>

                    <div className="uk-position-right uk-height-1-1">
                      <Image className="uk-height-1-1" src={box.image_url} />
                    </div>

                    { ( () => {
                      if(box.contents.length > 0){
                        return (
                          <Link className="uk-button uk-button-primary uk-width-1-1 uk-position-relative" to={ PathGenerator.purchase("credit", box.id) } onClick={ () => {this.closeModal()} } ga={{category: "top_modal", action: "select", label: box.id,nonInteraction: true}}>
                            これにする
                          </Link>
                        );
                      }else{
                        return (
                          <span className="uk-button uk-button-muted uk-width-1-1 uk-position-relative">
                            Comming Soon ...
                          </span>
                        );
                      }
                    } )() }
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
      getBoxes: () => dispatch(getBoxes())
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(BoxesModal);