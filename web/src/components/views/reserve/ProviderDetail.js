import React, { Component } from 'react';
import { Link as NativeLink, withRouter } from 'react-router-dom'

import { Link, Button } from "../../util/Clickable";
import { HeaderText } from "../../util/Text";
import { DateUtil } from "../../../utils/date";

class ProviderDetail extends Component {

  render = () => {
    return (
      <div>
        <HeaderText>
          事業者詳細
        </HeaderText>
        <table className="uk-table uk-table-middle uk-table-detail uk-margin">
          <tbody>
            <tr>
              <td>事業者名</td>
              <td>
                { this.props.content.provider.company_name }
              </td>
            </tr>
            <tr>
              <td>公式HP</td>
              <td>
                <Link href={this.props.content.link_url} target="_blank" ga={{category: "items_detail", action: "tap_content_url", label: "",nonInteraction: true}}>{this.props.content.link_url}</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default ProviderDetail;