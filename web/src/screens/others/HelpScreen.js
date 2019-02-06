import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Meta from "../../components/layout/Meta";
import { Link, Button } from "../../components/util/Clickable";
import { HeaderText, Header2Text } from "../../components/util/Text";
import QA from "../../components/part/QA";
import { Path, ExternalPath } from "../../constants/path"

import { helps } from "../../constants/helps";
import { scroller } from "../../utils/scroller";

class HelpScreen extends Component {

  componentDidMount = () => {
    if(this.props.location.hash != null && this.props.location.hash.indexOf("#") !== -1){
      setTimeout( () => {
        var element = document.querySelector(this.props.location.hash) ;
        if( element != null ){
          scroller( element );
        }
      }, 300 );
    }
  }

  renderCategory = (help) => {
    return (
      <div>
        <Header2Text>
          { help.category }
        </Header2Text>
        {
          help.contents.map( (content, index) => {
            return (
              <div className="uk-margin" key={index}>
                <QA question={content.question} answer={content.answer} />
              </div>      
            );
          })
        }
      </div>
    )
  }

  render = () => {
    return (
      <div>
        <Meta title="ヘルプ" />
        <div className="uk-section uk-section-large">
          <div className="uk-container uk-container-small">
            <HeaderText>
              ヘルプ
            </HeaderText>

            <div className="uk-margin-large">
              <ul className="uk-list">
                {
                  helps.map( (help, index) => {
                    return (
                      <li key={index}>
                        <Link href={"#category__"+index} {...{'uk-scroll': 'offset: 72;'}} className="uk-display-block">
                          <span className="uk-text-middle" {...{'uk-icon':'icon: chevron-right'}}></span>
                          <span className="uk-text-middle">{ help.category }</span>
                        </Link>
                      </li>
                    );
                  })
                }
              </ul>
            </div>

            {
              helps.map( (help, index) => {
                return (
                  <div className="uk-margin-large" key={index} id={"category__"+index}>
                    {
                      this.renderCategory( help )
                    }
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
    }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HelpScreen))