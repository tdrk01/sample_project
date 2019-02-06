import React, { Component } from 'react';
import { Link as NativeLink, withRouter } from 'react-router-dom'

import { Link, Button } from "../../util/Clickable";
import { HeaderText } from "../../util/Text";
import { DateUtil } from "../../../utils/date";

class HowToReserve extends Component {

  render = () => {
    return (
      <div>
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

        <table className="uk-table uk-table-middle uk-table-detail uk-margin">
          <tbody>
            <tr>
              <td>予約方法</td>
              {(()=>{
                if( this.props.content.reserve_way != null ){
                  return (
                    <td dangerouslySetInnerHTML={{__html: this.props.content.reserve_way.replace(/\n/g, "<br/>")}}>
                    </td>
                  );    
                }else{
                  return ( <td></td> );
                }
              })()}
            </tr>
            <tr>
              <td>
                チケット<br/>
                有効期限
              </td>
              <td>
                {(()=>{
                  if( this.props.purchase.expired_at != null ){
                    return DateUtil.toJaDateString( DateUtil.toDate(this.props.purchase.expired_at) )+"迄";    
                  }else{
                    return "なし";
                  }
                })()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default HowToReserve;