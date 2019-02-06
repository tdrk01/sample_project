import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Meta from "../../components/layout/Meta";
import Process from "../../components/part/Process";
import { HeaderText } from "../../components/util/Text";

import { Path, PathGenerator } from "../../constants/path";
import { getPurchase } from "../../actions/purchase";
import { Link, Button } from "../../components/util/Clickable";
import MessageModal from "../../components/part/MessageModal";
import { Image } from "../../components/util/Image";

import { DateUtil } from "../../utils/date";

import RemoteScreen from "../RemoteScreen";

class CompleteScreen extends RemoteScreen {

  constructor(props) {
    super(props);
    this.state = {
      purchase: {},
      hash: "",
      notFound: false
    };
  }

  componentDidMount = () => {
    var hash = this.props.match.params.hash;
    this.props.actions.getPurchase(hash).then( ({value, action}) => {
      if(value.status < 300){
        this.setState( {
          purchase: value.data,
          hash: hash
        });
      }else{
        this.didNotFound();
      }
    }).catch( error => console.log(error) );
  }

  getMessage = () => {
    var message = "tamate bacoをプレゼント！\n"
      +"\n"
      +"【手順①】\n"
      +"下記リンク先から、tamate baco へアクセス\n"
      + this.getUrl()
      +"\n"
      +"【手順②】\n"
      +"画面に表示される tamate baco をタップして、プレゼントをゲット！\n"
      +"\n"
      +"tamate baco とは？\n"
      +"https://tamateba.co/#whats";
      

    return encodeURIComponent(message);
  }

  getUrl = () => {
    return PathGenerator.gacha(this.state.hash);
  }

  sendLine = () => {
    var url = "https://line.me/R/msg/text/?" + this.getMessage();
    return url;
  }

  sendMessanger = () => {
    var url = "fb-messenger://share/?link=" + encodeURIComponent(this.getUrl());
    return url;
  }

  sendMail = () => {
    var url = "mailto:?subject=tamate baco のプレゼントです！&body="+this.getMessage();
    return url;
  }

  renderFound = () => {
    return (
      <div>
        <Meta title="購入が完了しました！" />
        <Process step={2} />

        { (()=>{
          if(this.state.purchase.id != null){
            return (
              <div className="uk-section uk-section-large">
                <div className="uk-container uk-container-ssmall">
                  <HeaderText>
                    購入が完了しました！
                  </HeaderText>
                  <div className="uk-margin-large uk-text-center">
                    <Image className="uk-width-medium" src={this.state.purchase.box.image_url} />
                  </div>

                  <div className="uk-margin-large">
                    <p>
                      tamate bacoの開封期限は
                      <span className="uk-h2 uk-text-danger">
                        { (()=>{
                          var date = DateUtil.toDate( this.state.purchase.created_at );
                          date.setDate( date.getDate() + 14 );
                          return DateUtil.toJaDateString( date );
                        })() }
                      </span>
                      です。
                    </p>
                    <Link className="uk-margin-small uk-button uk-button-line uk-width-1-1 uk-button-with-icon" href={this.sendLine()} ga={{category: "items_complete", action: "tap_line", label: "present",nonInteraction: true}}>
                      <i className="fab fa-line"></i>
                      <span>LINEで送る</span>
                    </Link>
                    <Link className="uk-margin-small uk-button uk-button-facebook uk-width-1-1 uk-button-with-icon" href={this.sendMessanger()} ga={{category: "items_complete", action: "tap_messenger", label: "present",nonInteraction: true}}>
                      <i className="fab fa-facebook-messenger"></i>
                      <span>Messangerで送る</span>
                    </Link>
                    <Link className="uk-margin-small uk-button uk-button-primary uk-width-1-1 uk-button-with-icon" href={this.sendMail()} ga={{category: "items_complete", action: "tap_mailto", label: "present",nonInteraction: true}}>
                      <i className="far fa-envelope"></i>
                      <span>メールで送る</span>
                    </Link>
                    <CopyToClipboard text={this.getUrl()} onCopy={() => this.modal.openModal() }>
                      <Button className="uk-margin-small uk-button uk-button-primary uk-width-1-1 uk-button-with-icon" ga={{category: "items_complete", action: "tap_copy", label: "present",nonInteraction: true}}>
                        <i className="far fa-copy"></i>
                        <span>URLをコピー</span>
                      </Button>
                    </CopyToClipboard>
                  </div>
                  <hr />
                  <div className="uk-margin-large">
                    <Link className="uk-margin-small uk-button uk-button-muted uk-width-1-1" to={PathGenerator.item("draw", this.state.hash)} ga={{category: "items_complete", action: "tap_myself", label: "",nonInteraction: true}}>
                      自分で開ける
                    </Link>
                  </div>
                </div>
              </div>
            );
          }
        })() }
        <MessageModal ref={modal => this.modal = modal} id="clip-modal" title="クリップボードにコピーしました" />
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
      user: state.user
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
      getPurchase: (hash) => dispatch(getPurchase(hash))
    }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompleteScreen))