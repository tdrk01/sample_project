import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Immutable from "immutable";

import { setRedirectTo } from "../../actions/auth";
import { getSample } from "../../actions/sample";
import RemoteScreen from "../RemoteScreen";

import Meta from "../../components/layout/Meta";
import { Link, Button } from "../../components/util/Clickable";
import { Image, imageUrl } from "../../components/util/Image";
import { HeaderText, Header2Text } from "../../components/util/Text";
import { Path, PathGenerator } from '../../constants/path'
import { scroller } from "../../utils/scroller";
import { DateUtil } from "../../utils/date";
import { Rare } from "../../utils/rare";

class SampleDetailScreen extends RemoteScreen {

  constructor(props) {
    super(props);
    this.state = {
      sample: {},
      id: "",
      notFound: false,
      notAuthorized : false,
      showCode: false,
      code: "ijin201805"
    };
  }

  componentDidMount = () => {
    var id = this.props.match.params.id;
    this.props.actions.getSample(id).then( ({value, action}) => {
      if(value.status < 300){
        this.setState( Immutable.fromJS(this.state)
          .updateIn(["sample"], v => value.data )
          .updateIn(["id"], v => id )
          .updateIn(["message"], v => "" )
          .toJS()
        );
      }else{
        this.didNotFound();
      }
    }).catch( error => console.log(error) );
  }

  tweet = () => {
    let url = "http://twitter.com/share?url=" + encodeURIComponent( process.env.REACT_APP_URL+ "?.ref=share_twitter_cp" ) + "&text=" + encodeURIComponent(this.contentText());

    window.open(url, 'popupwindow', 'width=550, height=450,personalbar=0,toolbar=0,scrollbars=1,resizable=1');

    this.toShowCode();
  }

  shareFB = () => {
    var fbId = process.env.REACT_APP_FB_ID;
    var shareUrl = process.env.REACT_APP_URL + "?.ref=share_facebook_cp";

    let url = "https://www.facebook.com/dialog/share?app_id="+fbId+"&display=popup&href="+encodeURIComponent(shareUrl)+"&quote="+encodeURIComponent(this.contentText());

    window.open(url, 'popupwindow', 'width=550, height=450,personalbar=0,toolbar=0,scrollbars=1,resizable=1');

    this.toShowCode();
  }

  toShowCode = () => {
    this.setState( Immutable.fromJS(this.state)
      .updateIn( ["showCode"], v => true )
      .toJS()
    );
  }

  contentText = () => {
    return "「"+this.state.sample.title+"」が当たりました！#tamatebaco #偉人と過ごす休日 ";
  }

  renderFound = () => {
    var sample = this.state.sample;
    if(sample.id == null){
      return null;
    }
    return (
      <div>
        <Meta title={this.state.sample.title} image={imageUrl(this.state.sample.image_url)} />

        <div className="uk-section">
          <div className="uk-container uk-container-ssmall">
            <div className="uk-position-relative">
              <Image className={"uk-width-1-1 uk-result-image-"+sample.is_rare} src={sample.image_url} />

              <div className="uk-position-small uk-position-bottom-left">
                <span className={"uk-label uk-result-label-"+sample.is_rare}>
                  { Rare.toLabel(sample.is_rare) }
                </span>
              </div>
            </div>
            <h1 className="uk-text-bold uk-text-center">
              { sample.title } 
            </h1>
            <div className="uk-text-center">
              <span>
                が当たりました！
              </span>
            </div>
          </div>
        </div>
              
        <div className="uk-section uk-section-muted">
          <div className="uk-container uk-container-ssmall">
              <div>
                <h2 className="uk-text-center uk-text-danger uk-text-bold uk-text-nowrap">
                  結果をシェアして<wbr/>お得なクーポンコードをGET!!
                </h2>
                <p className="uk-text-center@s">
                  今なら<span className="uk-text-danger uk-text-large">先着100名様</span>までtamate bacoを割安で購入できるクーポンが手に入ります！
                </p>
                <div className="uk-margin uk-grid-small uk-child-width-1-2" {...{'uk-grid':''}}>
                  <div>
                    <Link className="uk-button uk-width-1-1 uk-padding-remove uk-button-twitter uk-button-with-icon" onClick={this.tweet} ga={{category: "samples_detail", action: "tap_twitter", label: "share",nonInteraction: true}}>
                      <i className="fab fa-twitter"></i>
                      <small>ツイートする</small>
                    </Link>
                  </div>
                  <div>
                    <Link className="uk-button uk-width-1-1 uk-padding-remove uk-button-facebook uk-button-with-icon" onClick={this.shareFB} ga={{category: "samples_detail", action: "tap_facebook", label: "share",nonInteraction: true}}>
                      <i className="fab fa-facebook"></i>
                      <small>シェアする</small>
                    </Link>
                  </div>
                </div>

                { (()=>{
                  if(this.state.showCode){
                    return (
                      <div className="uk-margin-large uk-text-center">
                        <hr />
                        <Header2Text>
                          ありがとうございます！
                        </Header2Text>
                        <p className="">
                          クーポンコードは「
                          <span className="uk-h3 uk-margin-remove uk-text-danger">
                            { this.state.code }
                          </span>」です
                        </p>
                        <p className="">
                          <Link to={ Path.others.help.url + "#category__2" }>
                            <small>クーポンコードの使い方？</small>
                          </Link>
                        </p>
                      </div>
                    );
                  }
                })() }
              </div>
          </div>
        </div>

        <div className="uk-section">
          <div className="uk-container uk-container-ssmall">
            <p>
              偉人はついてきませんが、友達や大切な人と一緒にtamate bacoを開けてみませんか？<br/>
              <br/>
              ランダムに当たる初めての体験に、ドキドキ。ワクワク。2人の距離もグッと近づきます！<br/>
              <br/>
              もちろん、友人の誕生日や結婚の記念、二次会の景品など、プレゼントにもおすすめ！<br/>
              <br/>
              通常のtamate bacoも、ぜひお楽しみください！
            </p>
            <div className="uk-margin uk-text-center">
              <Link to={Path.root.url} className="uk-button uk-button-primary uk-width-large@s" ga={{category: "samples_detail", action: "tap_back_top", label: "",nonInteraction: true}}>
                トップページへ戻る
              </Link>
            </div>
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
      getSample: (id) => dispatch(getSample(id)),
    }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SampleDetailScreen))