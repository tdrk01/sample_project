import React, { Component } from 'react';
import { Link as NativeLink, withRouter } from 'react-router-dom'

import { Link, Button } from "../../util/Clickable";
import { HeaderText } from "../../util/Text";
import { DateUtil } from "../../../utils/date";

class ContentDetail extends Component {

  render = () => {
    return (
      <div>
        <HeaderText>
          体験詳細
        </HeaderText>
        <table className="uk-table uk-table-middle uk-table-detail uk-margin">
          <tbody>
            <tr>
              <td>体験名</td>
              <td>
                {this.props.content.name}
              </td>
            </tr>
            <tr>
              <td>体験内容</td>
              {(()=>{
                if( this.props.content.summary != null ){
                  return (
                    <td dangerouslySetInnerHTML={{__html: this.props.content.summary.replace(/\n/g, "<br/>")}}>
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
                {this.props.content.length}
              </td>
            </tr>
            <tr>
              <td className="uk-text-nowrap">準備する<wbr/>もの</td>
              <td>
                {this.props.content.tools}
              </td>
            </tr>
            <tr>
              <td>連絡先</td>
              <td>
                { ( () => {
                  if( this.props.content.tel != null ){
                    return (
                      <div>
                        <Link href={"tel:"+this.props.content.tel} ga={{category: "items_detail", action: "tap_contact_tel", label: "",nonInteraction: true}}>{this.props.content.tel}</Link>
                      </div>
                    );
                  }
                } )() }
                { ( () => {
                  if( this.props.content.email != null ){
                    return (
                      <div>
                        <Link href={"mailto:"+this.props.content.email} ga={{category: "items_detail", action: "tap_contact_email", label: "",nonInteraction: true}}>{this.props.content.email}</Link>
                      </div>
                    );
                  }
                } )() }
              </td>
            </tr>
            <tr>
              <td>アクセス</td>
              <td dangerouslySetInnerHTML={{__html: this.props.content.address.replace(/\n/g, "<br/>")}}>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default ContentDetail;