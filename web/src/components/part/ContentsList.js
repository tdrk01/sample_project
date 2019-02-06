import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getContents } from "../../actions/content";
import { Image } from "../util/Image";
import { Link, Button } from "../util/Clickable";

declare var UIkit;

class ContentsList extends Component {

  constructor(props){
    super(props);
    this.state = {
      contents: []
    };
  }

  componentDidMount = () => {
    this.props.actions.getContents().then( ({value, action}) => {
      if(value.status < 300){
        this.setState({
          contents: value.data.filter( (content) => {
            return content.content_images.length > 0;
          } )
        });
      }
    }).catch(error => console.log(error))
  }

  initSlider = () => {
    if( this.slider != null ){
      UIkit.slider(this.slider, {
        center: true,
        finit: false
      }).show(1);  
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    this.initSlider();
  }

  render = () => {

    if(this.state.contents.length == 0){
      return null;
    }
    return (
      <div ref={ slider => this.slider = slider }>

        <div className="uk-position-relative">
          <div className="uk-slider-container">
            <div className="uk-position-relative uk-visible-toggle">
              <ul className="uk-slider-items">
                { 
                  this.state.contents.map( (content, index) => {
                    return (
                      <li key={index} className="uk-width-auto uk-padding-ssmall">
                        <div className="uk-width-medium uk-height-medium uk-image-wrapper uk-position-relative">
                          <Image src={content.content_images[0].image_url} />
                          <div className="uk-position-bottom-left">
                            <span className="uk-label">
                              {content.name}
                            </span>
                          </div>
                        </div>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
          </div>
           <div className="uk-visible@m">
            <a className="uk-position-center-left-out" href="#" {...{'uk-slider-item':'previous', 'uk-slidenav-previous': ''}}></a>
            <a className="uk-position-center-right-out" href="#" {...{'uk-slider-item':'next', 'uk-slidenav-next': ''}}></a>
          </div>
        </div>

        <ul className="uk-slider-nav uk-dotnav uk-flex-center uk-margin">
          { 
            this.state.contents.map( (content, index) => {
              return (
                <li key={index} className={index==0 ? "uk-active" :""} {...{'uk-slider-item': index}} >
                  <a href="#"></a>
                </li>
              );
            })
          }
        </ul>

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
      getContents: () => dispatch(getContents())
    }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContentsList))