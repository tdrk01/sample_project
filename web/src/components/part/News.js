import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { HeaderText, Header2Text } from "../util/Text";
import { Image } from "../util/Image";

import { PriceUtil } from "../../utils/price";
import { Link, Button } from "../util/Clickable";
import { Path, PathGenerator } from "../../constants/path";
import { getBoxes } from "../../actions/box";

class News extends Component {

  constructor(props) {
    super(props);
    this.state = {
      news:[
        { 
          posted_at: "2018-05-06",
          title: "期間限定「#偉人と過ごす休日」 キャンペーン開催中。"
        },{
          posted_at: "2018-05-01",
          title: "「ドキドキばこ」が利用できるようになりました。"
        },{
          posted_at: "2018-04-30",
          title: "tamate bacoがオープンしました。"
        },
      ]
    };
  }

  componentDidMount = () => {
  }

  render = () => {
    return (
      <div className="uk-section uk-section-secondary">
        <div className="uk-container uk-container-small">
          <HeaderText>
            NEWS
          </HeaderText>

          <table className="uk-table uk-table-small uk-table-divider">
            <tbody>
              {
                this.state.news.map( (news, index) => {
                  return (
                    <tr key={index}>
                      <td className="uk-table-shrink">
                        <div className="uk-width-small">{ news.posted_at }</div>
                      </td>
                      <td>
                        <h4>
                          { news.title }
                        </h4>
                      </td>
                    </tr>                    
                  );
                })
              }
            </tbody>
          </table>

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

export default connect(mapStateToProps, mapDispatchToProps)(News);