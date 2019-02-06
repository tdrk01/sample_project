import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Immutable from "immutable";

import { getContent } from "../../actions/content";
import RemoteScreen from "../RemoteScreen";

import Meta from "../../components/layout/Meta";
import { Link, Button } from "../../components/util/Clickable";
import { Image } from "../../components/util/Image";
import { HeaderText } from "../../components/util/Text";
import { Path, PathGenerator } from '../../constants/path'

class PreviewScreen extends RemoteScreen {

  constructor(props) {
    super(props);
    this.state = {
      content: {},
      hash: "",
      notFound: false,
      notAuthorized : false,
      detail: false,
    };
  }

  componentDidMount = () => {
    var hash = this.props.match.params.hash;
    this.props.actions.getContent(hash).then( ({value, action}) => {
      if(value.status < 300){
        this.setState( Immutable.fromJS(this.state)
          .updateIn(["content"], v => value.data )
          .updateIn(["hash"], v => hash )
          .updateIn(["message"], v => "" )
          .toJS()
        );
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

  contentText = () => {
    return "「"+this.state.content.title+"」が当たりました！ ";
  }

  renderFound = () => {
    var content = this.state.content;
    if(content.id == null){
      return null;
    }
    return (
      <div>
        <Meta title={"プレビュー | " + content.title} />
        <div className="uk-section">
          <div className="uk-container uk-container-small">

            <div {...{'uk-grid': ''}}>
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
                        <Link className="uk-display-block uk-reset-link uk-detail-cover uk-position-bottom uk-text-center" onClick={this.openDetail}>
                          <small className="uk-text-primary uk-position-bottom">
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

        <div className="uk-section uk-section-muted">
          <div className="uk-container uk-container-small">
            <h2 className="uk-text-center uk-text-muted uk-text-bold uk-text-nowrap">
              体験が当たったことを<wbr/>シェアしよう！
            </h2>
            <div className="uk-margin uk-grid-small uk-child-width-1-2" {...{'uk-grid':''}}>
              <div>
                <Link className="uk-button uk-width-1-1 uk-padding-remove uk-button-twitter uk-button-with-icon" onClick={this.tweet}>
                  <i className="fab fa-twitter"></i>
                  <small>ツイートする</small>
                </Link>
              </div>
              <div>
                <Link className="uk-button uk-width-1-1 uk-padding-remove uk-button-facebook uk-button-with-icon" onClick={this.shareFB}>
                  <i className="fab fa-facebook"></i>
                  <small>シェアする</small>
                </Link>
              </div>
            </div>
          </div>
        </div>


        <div className="uk-section" ref={ flow => this.flow = flow }>
          <div className="uk-container uk-container-small">
            <HeaderText>
              体験の流れ
            </HeaderText>

            <div className="uk-margin" {...{'uk-grid':''}}>
              <div className="uk-width-auto">
                <span className="uk-text-bold uk-text-accent">
                  1.
                </span>
              </div>
              <div className="uk-width-expand">
                <span className="uk-text-bold">
                  予約する
                </span>
              </div>
            </div>

            <div className="uk-margin" {...{'uk-grid':''}}>
              <div className="uk-width-auto">
                <span className="uk-text-bold uk-text-accent">
                  2.
                </span>
              </div>
              <div className="uk-width-expand">
                <span className="uk-text-bold">
                  体験へGO
                </span>
              </div>
            </div>

            <div className="uk-margin" {...{'uk-grid':''}}>
              <div className="uk-width-auto">
                <span className="uk-text-bold uk-text-accent">
                  3.
                </span>
              </div>
              <div className="uk-width-expand">
                <span className="uk-text-bold">
                  このページを体験先のスタッフに見せる
                </span>
              </div>
            </div>

            <hr />

            <p>
              下記の方法で、体験可能な日に予約してください。<br/>
              なお予約の際には「tamate bacoで当たりました」とお伝えください。
            </p>

            <table className="uk-table uk-table-detail uk-margin">
              <tbody>
                <tr>
                  <td>予約方法</td>
                  {(()=>{
                    if( content.reserve_way != null ){
                      return (
                        <td dangerouslySetInnerHTML={{__html: content.reserve_way.replace(/\n/g, "<br/>")}}>
                        </td>
                      );    
                    }else{
                      return ( <td></td> );
                    }
                  })()}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="uk-section">
          <div className="uk-container uk-container-small">
            <HeaderText>
              体験詳細
            </HeaderText>

            <table className="uk-table uk-table-detail uk-margin">
              <tbody>
                <tr>
                  <td>体験名</td>
                  <td>
                    {content.name}
                  </td>
                </tr>
                <tr>
                  <td>体験内容</td>
                  {(()=>{
                    if( content.summary != null ){
                      return (
                        <td dangerouslySetInnerHTML={{__html: content.summary.replace(/\n/g, "<br/>")}}>
                        </td>
                      );    
                    }else{
                      return ( <td></td> );
                    }
                  })()}
                </tr>
                <tr>
                  <td>所要時間</td>
                  <td>
                    {content.length}
                  </td>
                </tr>
                <tr>
                  <td className="uk-text-nowrap">準備する<wbr/>もの</td>
                  <td>
                    {content.tools}
                  </td>
                </tr>
                <tr>
                  <td>連絡先</td>
                  <td>
                    { ( () => {
                      if( content.tel != null ){
                        return (
                          <div>
                            <Link href={"tel:"+content.tel}>{content.tel}</Link>
                          </div>
                        );
                      }
                    } )() }
                    { ( () => {
                      if( content.email != null ){
                        return (
                          <div>
                            <Link href={"mailto:"+content.email}>{content.email}</Link>
                          </div>
                        );
                      }
                    } )() }
                  </td>
                </tr>
                <tr>
                  <td>アクセス</td>
                  <td dangerouslySetInnerHTML={{__html: content.address.replace(/\n/g, "<br/>")}}>
                  </td>
                </tr>
              </tbody>
            </table>

            <HeaderText>
              事業者詳細
            </HeaderText>
            <table className="uk-table uk-table-detail uk-margin">
              <tbody>
                <tr>
                  <td>事業者名</td>
                  <td>
                    { content.provider.company_name }
                  </td>
                </tr>
                <tr>
                  <td>公式HP</td>
                  <td>
                    <Link href={content.link_url} target="_blank">{content.link_url}</Link>
                  </td>
                </tr>
              </tbody>
            </table>

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
      getContent: (hash) => dispatch(getContent(hash)),
    }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PreviewScreen))