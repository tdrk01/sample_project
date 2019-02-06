import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Meta from "../components/layout/Meta";
import { Path } from "../constants/path";
import TopSlider from "../components/part/TopSlider";
import HowToUse from "../components/part/HowToUse";
import ContentsList from "../components/part/ContentsList";
import CommentCell from "../components/part/CommentCell";
import QA from "../components/part/QA";
import Boxes from "../components/part/Boxes";
import CampaignModal from "../components/part/CampaignModal";

import { HeaderText, Header2Text } from "../components/util/Text";

import top from "../assets/images/material/top.jpg"

import { topHelps } from "../constants/helps";
import { scroller } from "../utils/scroller";
import { Link, Button } from "../components/util/Clickable";
import CampaignButton from "../components/part/CampaignButton";

class RootScreen extends Component {

  componentDidMount = () => {
    if(this.props.location.hash == "#whats"){
      setTimeout( () => {
        scroller( this.whats );    
      }, 300 );
    }
  }

  toSample = () => {
    this.props.history.push( Path.samples.complete.url );
  }

  render = () => {
    return (
      <div>
        <Meta />
        <TopSlider />

        <div className="uk-section uk-section-large">
          <div className="uk-container uk-container-small" ref={ whats => this.whats = whats } >
            <h3 className="uk-text-center uk-heading-primary uk-text-primary uk-text-nowrap">
              あなたの休日を、<wbr/>適当に決めます
            </h3>
            <p className="uk-text-center@s">
              「週末はだいたい飲み会、土日は寝てる…」<br/>
              「大人になってから趣味、好きなことが増えてない…」<br/>
              <br/>
              tamate baco(たまてばこ) は非日常・未体験なことを、ランダムに提案します。<br/>
              <br/>
              『まだ知らない好きなこと』に出会えるかも。<br/>
              <br/>
              『初めて』を楽しみましょう。
            </p>
            
          </div>
        </div>

        <div className="uk-section uk-section-large uk-section-muted">
          <div className="uk-container">
            <HeaderText>
              tamate bacoの使い方
            </HeaderText>
            <div className="uk-margin-large">
              <HowToUse />
            </div>
          </div>
        </div>


        <div className="uk-section uk-section-large">
          <div className="uk-container uk-small-container uk-container-small">
            <HeaderText className="uk-text-nowrap">
              tamate baco の中身を<wbr/>ちょっとだけ
            </HeaderText>
            <div className="uk-margin-large">
              <ContentsList />
            </div>
          </div>
        </div>

        <div className="uk-section uk-section-muted uk-section-large">
          <div className="uk-container uk-container-small">
            <HeaderText>
              体験者の声
            </HeaderText>
            <div className="uk-margin-large">
              <div className="uk-child-width-1-2@m" {...{'uk-grid': ''}}>
                <CommentCell gender={0} description={"最近結婚した友人に、一生のパートナーと新しいことを体験をしてほしいと思い、tamate baco を贈りました！今まで全く興味をもったことのない体験だったみたいですが、楽しんでくれたようです（笑）"} name={"27歳男性"} />
                <CommentCell gender={1} description={"普段、あまり冒険はしないのですが、せっかくプレゼントしてもらったので体験してきました。ちょっとめんどくさいと思ってたけど、実際に行ってみたら、想像よりも楽しくて大満足でした！ 今度は誰かにプレゼントしてあげたいです。"} name={"26歳女性"} />
              </div>
            </div>
          </div>
        </div>

        <div className="uk-section uk-section-large">
          <div className="uk-container uk-container-small">

            {
              topHelps.map( (help, index) => {
                return (
                  <div key={index}>
                    <HeaderText>
                      {help.category}
                    </HeaderText>
                    {
                      help.contents.map( (content, index) => {
                        return (
                          <div key={index} className="uk-margin-large">
                            <QA question={content.question} answer={content.answer} />
                          </div>  
                        );
                      })
                    }
                  </div>
                );
              })
            }

            <div className="uk-margin-large uk-text-center">
              <Link to={Path.others.help.url}>
                <small>
                  > よくある質問をもっと見る
                </small>
              </Link>
            </div>

          </div>
        </div>


        <div className="uk-section uk-section-muted uk-section-large">
          <div className="uk-container uk-container-small">
            <HeaderText>
              tamate bacoの種類
            </HeaderText>
            <div className="uk-margin-large">
              <Boxes />
            </div>
          </div>
        </div>

        <div className="uk-position-bottom uk-position-fixed uk-position-small uk-position-z-index">
          <CampaignButton onClick={() => {
            this.campaignModal.openModal();
          }} />
        </div>
        <CampaignModal ref={ campaignModal => this.campaignModal = campaignModal } onClick={this.toSample} />

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
    }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RootScreen))