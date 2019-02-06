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

import ijin_box from "../../assets/images/gacha/ijin_box.png";

class SampleCompleteScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount = () => {
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
    return PathGenerator.sampleDraw();
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

  render = () => {
    return (
      <div>
        <Meta title="オタメシばこを手に入れました" />
        <div className="uk-section uk-section-large">
          <div className="uk-container uk-container-ssmall">
            <HeaderText className="uk-text-nowrap">
              オタメシばこ<wbr/>を手に入れました！
            </HeaderText>
            <div className="uk-margin-large uk-text-center">
              <img className="uk-width-medium" src={ijin_box} />
            </div>
            <div className="uk-margin-large">
              <Link className="uk-margin-small uk-button uk-button-primary uk-width-1-1" to={Path.samples.draw.url} ga={{category: "samples_complete", action: "tap_myself", label: "",nonInteraction: true}}>
                自分で開ける
              </Link>
            </div>
            <hr />
            <div className="uk-text-nowrap uk-text-center">
            プレゼントする
            </div>
            <div className="uk-margin-large">
              <Link className="uk-margin-small uk-button uk-button-line uk-width-1-1 uk-button-with-icon" href={this.sendLine()} ga={{category: "samples_complete", action: "tap_line", label: "present",nonInteraction: true}}>
                <i className="fab fa-line"></i>
                <span>LINEで送る</span>
              </Link>
              <Link className="uk-margin-small uk-button uk-button-facebook uk-width-1-1 uk-button-with-icon" href={this.sendMessanger()} ga={{category: "samples_complete", action: "tap_messenger", label: "present",nonInteraction: true}}>
                <i className="fab fa-facebook-messenger"></i>
                <span>Messangerで送る</span>
              </Link>
              <Link className="uk-margin-small uk-button uk-button-primary uk-width-1-1 uk-button-with-icon" href={this.sendMail()} ga={{category: "samples_complete", action: "tap_mailto", label: "present",nonInteraction: true}}>
                <i className="far fa-envelope"></i>
                <span>メールで送る</span>
              </Link>
              <CopyToClipboard text={this.getUrl()} onCopy={() => this.modal.openModal() }>
                <Button className="uk-margin-small uk-button uk-button-primary uk-width-1-1 uk-button-with-icon" ga={{category: "samples_complete", action: "tap_copy", label: "present",nonInteraction: true}}>
                  <i className="far fa-copy"></i>
                  <span>URLをコピー</span>
                </Button>
              </CopyToClipboard>
            </div>

          </div>
        </div>

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
    }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SampleCompleteScreen))