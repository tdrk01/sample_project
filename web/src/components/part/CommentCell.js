import React, { Component } from "react";
import { HeaderText, Header2Text } from "../util/Text";

import man from "../../assets/images/icon/man.png";
import woman from "../../assets/images/icon/woman.png";

class CommentCell extends Component {

  render = () => {
    return (
      <div>
        <div className="uk-position-relative" style={{paddingBottom: 48}}>
          <div className="uk-margin uk-baloon uk-baloon-bottom">
            <p>
              { this.props.description }
            </p>
            <p className="uk-margin-small uk-text-right">
              <span className="uk-text-primary">
                { this.props.name }
              </span>
            </p>  
          </div>

          <div className="uk-position-bottom uk-text-center">
          {(()=>{
            if( this.props.gender == 0 ){
              return (
                <img src={man} className="uk-width-small" />
              );
            }else{
              return (
                <img src={woman} className="uk-width-small" />
              );
            }
          })()}
          </div>

        </div>
      </div>
    );
  }
}

export default CommentCell;