import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Immutable from "immutable";

import { getPurchaseDetail, useTicket } from "../../actions/purchase";
import RemoteScreen from "../RemoteScreen";

import { setRedirectTo } from "../../actions/auth";

import Meta from "../../components/layout/Meta";
import { Link, Button } from "../../components/util/Clickable";
import { Image, imageUrl } from "../../components/util/Image";
import { HeaderText, Header2Text } from "../../components/util/Text";
import { Path, PathGenerator } from '../../constants/path'
import UseModal from "../../components/part/UseModal";
import MessageModal from "../../components/part/MessageModal";
import { PurchaseStatus } from "../../constants/status";
import { DateUtil } from "../../utils/date";

class TicketScreen extends RemoteScreen {

  constructor(props) {
    super(props);
    this.state = {
      purchase: {},
      hash: "",
      notFound: false,
      notAuthorized : false,
      used: false,
      message: "",
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
          .updateIn(["used"], v => (value.data.status == PurchaseStatus.CANCELED) || (value.data.status == PurchaseStatus.PLAYED) || (value.data.status == PurchaseStatus.ANSWERED) )
          .toJS()
        );
      }else if(value.status == 403){
        this.didNotAuthorized();
      }else{
        this.didNotFound();
      }
    }).catch( error => console.log(error) );
  }

  openModal = () => {
    this.useModal.openModal();
  }

  onUse = () => {
    this.props.actions.useTicket(this.state.hash).then( ({value, action}) => {
      if(value.status < 300){
        this.setState( Immutable.fromJS(this.state)
          .updateIn(["used"], v => true )
          .toJS()
        );
        this.successModal.openModal();
      }else{
        this.setState( Immutable.fromJS(this.state)
          .updateIn(["message"], v => value.message )
          .toJS()
        );
        this.errorModal.openModal();
      }
    }).catch( error => console.log(error) );
  }

  renderFound = () => {
    var content = this.state.purchase.content;
    if(content == null){
      return null;
    }
    return (
      <div>
        <Meta title={"チケット詳細 | "+content.title} image={ imageUrl(content.content_images.length > 0 ? content.content_images[0].image_url : null) } />
        <div className="uk-section uk-section-large">
          <div className="uk-container uk-container-ssmall">
            <HeaderText>
              tamate baco チケット
            </HeaderText>

            <h1 className="uk-text-bold">
              { content.name } 
              <small className="uk-text-muted uk-margin-small-right">
                - { content.number }
              </small>
            </h1>

            <table className="uk-table uk-table-detail uk-table-middle uk-margin">
              <tbody>
                <tr>
                  <td>チケットID</td>
                  <td className="uk-text-center">
                    {this.state.purchase.id}
                  </td>
                </tr>
                <tr>
                  <td>コンテンツID</td>
                  <td className="uk-text-center">
                    {content.id}
                  </td>
                </tr>
                <tr>
                  <td>有効期限</td>
                  <td className="uk-text-center">
                    {(()=>{
                      if( this.state.purchase.expired_at != null ){
                        return DateUtil.toJaDateString( DateUtil.toDate(this.state.purchase.expired_at) )+"迄";
                      }else{
                        return "なし";
                      }
                    })()}
                  </td>
                </tr>
              </tbody>
            </table>

            <Header2Text>
              スタッフの方へ
            </Header2Text>
            <p>
              このチケットを利用する際に下記のボタンをクリックしてください。
            </p>
            
            {(()=>{
              if( !this.state.used ){
                return (
                  <div className="uk-margin">
                    <Button className="uk-button uk-button-accent uk-width-1-1" onClick={this.openModal} ga={{category: "items_ticket", action: "tap_used", label: "",nonInteraction: true}}>
                      チケットを利用済みにする
                    </Button>
                  </div>  
                );
              }else{
                return (
                  <div className="uk-margin">
                    <Link className="uk-button uk-button-muted uk-width-1-1">
                      利用済み
                    </Link>
                  </div>  
                );
              }
            })()}
            
            <div className="uk-margin uk-text-center">
              <Link to={PathGenerator.item("detail", this.state.hash)} ga={{category: "items_ticket", action: "tap_return", label: "",nonInteraction: true}}>
                体験の詳細へ戻る
              </Link>
            </div>  

            <UseModal id="use-modal" ref={ useModal => this.useModal = useModal } onUse={this.onUse} />
            <MessageModal id="success-modal" ref={ successModal => this.successModal = successModal } title="チケットが使用されました" message="今後こちらのチケットIDは利用できなくなります" />
            <MessageModal id="error-modal" ref={ errorModal => this.errorModal = errorModal }
              title="利用できません"
              message={this.state.message} />

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
      setRedirectTo: (url) => dispatch(setRedirectTo(url)),
      useTicket: (hash) => dispatch(useTicket(hash)),
      getPurchaseDetail: (hash) => dispatch(getPurchaseDetail(hash)),
    }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TicketScreen))