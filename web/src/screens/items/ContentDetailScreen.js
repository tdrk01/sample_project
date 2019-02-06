import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Immutable from "immutable";

import { setRedirectTo } from "../../actions/auth";
import { getPurchaseDetail } from "../../actions/purchase";
import RemoteScreen from "../RemoteScreen";

import Meta from "../../components/layout/Meta";
import { Link, Button } from "../../components/util/Clickable";
import { Image, imageUrl } from "../../components/util/Image";
import { HeaderText } from "../../components/util/Text";
import { Path, PathGenerator } from '../../constants/path'
import { scroller } from "../../utils/scroller";
import { DateUtil } from "../../utils/date";

import HowToReserve from "../../components/views/reserve/HowToReserve";
import HowToWait from "../../components/views/reserve/HowToWait"; 
import HowToGet from "../../components/views/reserve/HowToGet"; 
import ContentDetail from "../../components/views/reserve/ContentDetail"; 
import ProviderDetail from "../../components/views/reserve/ProviderDetail"; 
import ToTicket from "../../components/views/reserve/ToTicket";
import SendAddress from "../../components/views/reserve/SendAddress";

import { DO_SELF, SEND, BY_TODOROKI } from "../../constants/reserve_type";

class ContentDetailScreen extends RemoteScreen {

  constructor(props) {
    super(props);
    this.state = {
      purchase: {},
      hash: "",
      notFound: false,
      notAuthorized : false,
      detail: false,
    };
  }

  componentDidMount = () => {
    var hash = this.props.match.params.hash;
    this.props.actions.getPurchaseDetail(hash).then( ({value, action}) => {
      if(value.status < 300){
        if(value.data.content == null){
          this.props.history.push(PathGenerator.item("draw", hash));
          return;
        }
        this.setState( Immutable.fromJS(this.state)
          .updateIn(["purchase"], v => value.data )
          .updateIn(["hash"], v => hash )
          .updateIn(["message"], v => "" )
          .toJS()
        );
        if(this.props.location.hash == "#flow"){
          scroller( this.flow );
        }
      }else if(value.status == 403){
        this.didNotAuthorized();
      }else{
        this.didNotFound();
      }
    }).catch( error => console.log(error) );
  }

  openDetail = () => {
    this.setState( Immutable.fromJS(this.state)
      .updateIn(["detail"], v => true )
      .toJS()
    );
  }

  tweet = () => {
    let url = "http://twitter.com/share?url=" + encodeURIComponent( process.env.REACT_APP_URL+ "?.ref=share_twitter" ) + "&text=" + this.contentText();

    window.open(url, 'popupwindow', 'width=550, height=450,personalbar=0,toolbar=0,scrollbars=1,resizable=1');
  }

  shareFB = () => {
    var fbId = process.env.REACT_APP_FB_ID;
    var shareUrl = process.env.REACT_APP_URL + "?.ref=share_facebook";

    let url = "https://www.facebook.com/dialog/share?app_id="+fbId+"&display=popup&href="+shareUrl+"&quote="+this.contentText();

    window.open(url, 'popupwindow', 'width=550, height=450,personalbar=0,toolbar=0,scrollbars=1,resizable=1');
  }

  contentText = () => {
    return "「"+this.state.purchase.content.title+"」が当たりました！#tamatebaco ";
  }

  renderForSelf = (content) => {
    return (
      <div>
        <div className="uk-section uk-section-large">
          <div className="uk-container uk-container-small">
            <div {...{'uk-grid': ''}}>
              <div className="uk-width-1-1">
                <HowToReserve 
                  content={content}
                  purchase={this.state.purchase}
                />
              </div>
              <div className="uk-width-1-2@m">
                <ContentDetail 
                  content={content}
                  purchase={this.state.purchase}
                />
              </div>
              <div className="uk-width-1-2@m">
                <ProviderDetail 
                  content={content}
                  purchase={this.state.purchase}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="uk-section uk-section-muted uk-section-large">
          <div className="uk-container uk-container-small">
            <ToTicket 
              detailLink={ PathGenerator.item("ticket", this.state.hash ) } 
            />
          </div>
        </div>
      </div>
    )
  }

  renderForSend = (content) => {
    return (
      <div>
        <div className="uk-section uk-section-large">
          <div className="uk-container uk-container-small">
            <div {...{'uk-grid': ''}}>
              <div className="uk-width-1-1">
                <HowToGet 
                  content={content}
                  purchase={this.state.purchase}
                />
              </div>
              <div className="uk-width-1-1">
                <ContentDetail 
                  content={content}
                  purchase={this.state.purchase}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="uk-section uk-section-muted uk-section-large">
          <div className="uk-container uk-container-ssmall">
            <SendAddress hash={this.state.hash} purchase={this.state.purchase} />
          </div>
        </div>
      </div>
    );
  }

  renderForTodoroki = (content) => {
    return (
      <div>
        <div className="uk-section uk-section-large">
          <div className="uk-container uk-container-small">
            <div {...{'uk-grid': ''}}>
              <div className="uk-width-1-1">
                <HowToWait 
                  content={content}
                  purchase={this.state.purchase}
                />
              </div>
              <div className="uk-width-1-2@m">
                <ContentDetail 
                  content={content}
                  purchase={this.state.purchase}
                />
              </div>
              <div className="uk-width-1-2@m">
                <ProviderDetail 
                  content={content}
                  purchase={this.state.purchase}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderFound = () => {
    var content = this.state.purchase.content;
    if(content == null){
      return null;
    }
    return (
      <div>
        <Meta title={"体験詳細 | "+content.title} image={ imageUrl(content.content_images.length > 0 ? content.content_images[0].image_url : null) } />
        <div className="uk-section uk-section-large">
          <div className="uk-container uk-container-small">

            <div className="uk-flex-middle" {...{'uk-grid': ''}}>
              {(()=>{
                if(content.content_images.length > 0){
                  return (
                    <div className="uk-width-1-2@s">
                      <Image className="uk-width-1-1" src={content.content_images[0].image_url} />
                    </div>
                  );
                }
              })()}
              <div className="uk-width-expand">
                <h1 className="uk-text-bold">
                  { content.title } 
                  <small className="uk-text-muted uk-margin-small-right">
                    - { content.number }
                  </small>
                </h1>

                <div className="uk-position-relative uk-margin">
                  <p className={ !this.state.detail ? 'uk-height-small uk-overflow-hidden': '' } dangerouslySetInnerHTML={{__html: content.description.replace(/\n/g, "<br/>")}}>
                  </p>

                  { (()=>{
                    if(!this.state.detail){
                      return (
                        <Link className="uk-display-block uk-reset-link uk-detail-cover uk-position-bottom uk-text-center" onClick={this.openDetail} ga={{category: "items_detail", action: "tap_more_read", label: "",nonInteraction: true}}>
                          <small className="uk-text-primary uk-position-bottom uk-position-small">
                            もっと読む
                          </small>
                        </Link>
                      );
                    }
                  })() }
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="uk-section uk-section-muted uk-section-large">
          <div className="uk-container uk-container-small">
            <h2 className="uk-text-center uk-text-muted uk-text-bold uk-text-nowrap">
              体験が当たったことを<wbr/>シェアしよう！
            </h2>
            <div className="uk-margin uk-grid-small uk-child-width-1-2" {...{'uk-grid':''}}>
              <div>
                <Link className="uk-button uk-width-1-1 uk-padding-remove uk-button-twitter uk-button-with-icon" onClick={this.tweet} ga={{category: "items_detail", action: "tap_twitter", label: "share",nonInteraction: true}}>
                  <i className="fab fa-twitter"></i>
                  <small>ツイートする</small>
                </Link>
              </div>
              <div>
                <Link className="uk-button uk-width-1-1 uk-padding-remove uk-button-facebook uk-button-with-icon" onClick={this.shareFB} ga={{category: "items_detail", action: "tap_facebook", label: "share",nonInteraction: true}}>
                  <i className="fab fa-facebook"></i>
                  <small>シェアする</small>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div ref={ flow => this.flow = flow }>
        {( () => {
          if(content.reserve_type == DO_SELF){
            return this.renderForSelf(content);
          }else if(content.reserve_type == SEND){
            return this.renderForSend(content);
          }else{
            return this.renderForTodoroki(content);
          }
        })()}
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
      setRedirectTo: (url) => dispatch(setRedirectTo(url)),
      getPurchaseDetail: (hash) => dispatch(getPurchaseDetail(hash)),
    }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContentDetailScreen))