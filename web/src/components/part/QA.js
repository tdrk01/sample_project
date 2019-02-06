import React, { Component } from "react";
import { HeaderText, Header2Text } from "../util/Text";


class QA extends Component {

  render = () => {
    return (
      <div>
        <div className="uk-margin uk-grid-small" {...{'uk-grid': ''}}>
          <div className="uk-width-auto">
            <span className="uk-text-bold uk-text-accent">Q</span>
          </div>
          <div className="uk-width-expand">
            <span className="uk-text-bold">{ this.props.question }</span>
          </div>
        </div>

        <div className="uk-margin uk-grid-small" {...{'uk-grid': ''}}>
          <div className="uk-width-auto">
            <span className="uk-text-bold uk-text-primary">A</span>
          </div>
          <div className="uk-width-expand" >
            <p dangerouslySetInnerHTML={{__html: this.props.answer }}></p>
          </div>
        </div>
      </div>
    );
  }
}

export default QA;