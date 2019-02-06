import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { HeaderText, Header2Text } from "../util/Text";
import { Image } from "../util/Image";

import { PriceUtil } from "../../utils/price";
import { Link, Button } from "../util/Clickable";
import { Path, PathGenerator } from "../../constants/path";
import { getBoxes } from "../../actions/box";

class Boxes extends Component {

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

  render = () => {
    return (
      <div className="uk-child-width-1-3@m uk-flex-center uk-grid-match" {...{'uk-grid': ''}}>
        {
          this.state.boxes.map( (box, index) => {
            return (
              <div key={index}>
                <div className="uk-background-white uk-position-relative">
                  <div className="uk-padding" style={{marginBottom: 36}}>
                    <h3 className="uk-text-center uk-margin-remove uk-header-marked gray uk-text-primary uk-text-bold">
                      {box.name}
                    </h3>
                    <h5 className="uk-text-center uk-margin-remove uk-text-primary">
                      {"¥ "+ PriceUtil.putComma(box.price) }
                    </h5>

                    {(()=>{
                      if( box.remarked != null ){
                        return (
                          <div className="uk-text-center">
                            <small className="uk-margin-small-left uk-text-muted">
                              {box.remarked}
                            </small>
                          </div>
                        );
                      }else{
                        return (
                          <div className="uk-text-center uk-padding-small">
                          </div>
                        );
                      }
                    })()}

                    <div className="uk-margin uk-height-small uk-text-center">
                      <Image className="uk-height-1-1" src={box.image_url} />
                    </div>

                    <div className="uk-margin  uk-child-width-auto uk-grid-small uk-flex-center" {...{'uk-grid':''} }>
                      {
                        box.contents.filter((content) => {
                          return content.content_images.length > 0;
                        }).map( (content, index) => {
                          if(index < 3){
                            return (
                              <div key={index}>
                                <div className="uk-border-circle uk-width-icon uk-height-icon uk-image-wrapper uk-position-relative">
                                  <Image src={content.content_images[0].image_url} />
                                </div>
                              </div>
                            );
                          }
                        })
                      }
                    </div>
                  </div>

                  { ( ()=>{
                    if( box.contents.length > 0 ){
                      return (
                        <div className="uk-grid-collapse uk-child-width-1-2 uk-position-bottom" {...{'uk-grid': ''}}>
                          <div>
                            <Link className="uk-button uk-button-primary uk-width-1-1 uk-padding-remove-horizontal uk-button-large uk-button-border-right" to={ PathGenerator.purchase("credit", box.id) } 
                              ga={{category: "top_button", action: "tap_present", label: box.id,nonInteraction: true}}
                            >
                              プレゼントする
                            </Link>
                          </div>
                          <div>
                            <Link className="uk-button uk-button-primary uk-width-1-1 uk-padding-remove-horizontal uk-button-large uk-button-border-left" to={ PathGenerator.purchase("credit", box.id) }
                              ga={{category: "top_button", action: "tap_myself", label: box.id,nonInteraction: true}}
                            >
                              自分でやる
                            </Link>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div className="uk-position-bottom uk-padding-small">
                          <h2 className="uk-text-center uk-text-muted">
                            Comming Soon ...
                          </h2>
                        </div>
                      );
                    }
                  } )() }

                </div>
              </div>
            );
          })
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(Boxes);