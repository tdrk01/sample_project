import React, { Component } from 'react';
import { Link, Button } from "../util/Clickable";

import { bounce } from 'react-animations';
import Radium, { Style, StyleRoot } from 'radium';

const styles = {
  bounce: {
    animation: 'x 3s',
    animationName: Radium.keyframes(bounce, 'bounce')
  }
}

class CampaignButton extends Component {

  state = {
    animation: false
  }

  componentDidMount = () => {
    this.setState({animation: true});
  }

  render = () => {
    return (
      <StyleRoot>
        <div style={styles.bounce}>
          <Button className="uk-border-rounded uk-button uk-button-gradient uk-padding-small"
            ga={{category: "footer_button", action: "tap_sample", label: "main_image",nonInteraction: true}}
            onClick={ () => {
              this.props.onClick && this.props.onClick();
            }}
            style={{lineHeight: 1, padding: 8}}
          >
            <div className="uk-flex-middle uk-grid-collapse" {...{'uk-grid': ''}}>
              <div className="uk-text-center">
                <h4 className="uk-text-white uk-margin-remove">
                  『#偉人と過ごす休日』
                </h4>
                <small className="uk-margin-remove">
                  期間限定キャンペーン実施中！
                </small>
              </div>
              <div className="uk-width-auto">
                <small className="uk-button-ssmall uk-background-white">
                  詳しくはコチラ ▶︎
                </small>
              </div>
            </div>
          </Button>
        </div>
      </StyleRoot>
    );
  }

}

export default CampaignButton;