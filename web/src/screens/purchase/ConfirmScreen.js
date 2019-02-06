import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Immutable from "immutable"

import Meta from "../../components/layout/Meta";
import RemoteScreen from "../RemoteScreen";
import { Link, Button } from "../../components/util/Clickable";
import Process from "../../components/part/Process";
import { HeaderText } from "../../components/util/Text";
import { Path, PathGenerator } from "../../constants/path";
import { PriceUtil } from "../../utils/price";
import { purchase } from "../../actions/purchase";
import { setError } from "../../actions/message";
import { getBox } from "../../actions/box";
import { editUser } from "../../actions/user";

class ConfirmScreen extends RemoteScreen {

  constructor(props) {
    super(props);
    this.state = {
      box: {},
      notFound: false,
      price: 0
    }
  }

  componentDidMount = () => {

    if(this.props.card.name == null){
      this.backToCredit();
      return;
    }

    this.props.actions.getBox(this.props.match.params.boxId).then( ({value, action}) => {
      if(value.status < 300){
        this.setState(Immutable.fromJS(this.state)
          .updateIn(["box"], v => value.data)
          .updateIn(["price"], v => {
            if( this.props.code.data == null ){
              return value.data.price;  
            }
            return (value.data.price - this.props.code.data.price) > 0 ? value.data.price - this.props.code.data.price : 0;
          })
          .toJS()
        );
      }else{
        this.didNotFound();
      }
    }).catch(error => console.log(error));
  }

  backToCredit = () => {
    this.props.history.push( PathGenerator.purchase("credit", this.props.match.params.boxId) );
  }

  toPurchase = () => {
    var params = Object.assign({
      box_id: this.state.box.id,
      code: this.props.code.data != null ? this.props.code.data.code : null,
      token_id: this.props.card.token_id
    });

    this.props.actions.purchase(params).then( ({value, action}) => {
      if(value.status < 300){
        this.props.history.push( PathGenerator.item("complete", value.data.register_token) );
      }else{
        this.props.actions.setError(value.message);
        this.backToCredit();
      }
    }).catch( error => {
      console.log(error);
    });
    this.props.actions.editUser( this.props.user.user.id, this.props.user.user ).then( ({value, action}) => {
    }).catch( error => {
      console.log(error);
    });
  }

  renderFound = () => {
    if(this.state.box.id == null){
      return (<div />);
    }
    return (
      <div>
        <Meta title="購入内容の確認" />
        <Process step={1} />
        <div className="uk-section uk-section-large">
          <div className="uk-container uk-container-ssmall">
            <HeaderText>
              購入内容の確認
            </HeaderText>
            <div className="uk-margin-large">
              <table className="uk-table uk-table-divider uk-table-small uk-margin-remove uk-confirm-table">
                <tbody>
                  <tr>
                    <td>
                      <small className="uk-text-bold">お名前</small>
                    </td>
                    <td>
                      <span className="uk-text-primary">
                        {this.props.user.user.name}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <small className="uk-text-bold">電話番号</small>
                    </td>
                    <td>
                      <span className="uk-text-primary">
                        {this.props.user.user.tel}
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <small className="uk-text-bold">クレジットカード名義</small>
                    </td>
                    <td>
                      <span className="uk-text-primary">
                        {this.props.card.name}
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <small className="uk-text-bold">クレジットカード番号</small>
                    </td>
                    <td>
                      <span className="uk-text-primary">
                        {this.props.card.number}
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <small className="uk-text-bold">有効期限</small>
                    </td>
                    <td>
                      {(()=>{
                        if(this.props.card.exp != null){
                          return (
                            <span className="uk-text-primary">
                              {this.props.card.exp.month}月/{this.props.card.exp.year}年
                            </span>
                          );
                        }
                      })()}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <small className="uk-text-bold uk-text-nowrap">セキュリティー<wbr/>コード</small>
                    </td>
                    <td>
                      <span className="uk-text-primary">
                        {this.props.card.cvc}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr className="uk-margin-small" />
              <hr className="uk-margin-small" />

              <table className="uk-table uk-table-divider uk-table-small uk-margin-remove uk-confirm-table">
                <tbody>
                  <tr>
                    <td className="uk-table-shrink">
                      <small className="uk-text-bold uk-text-nowrap">購入する<wbr/>商品</small>
                    </td>
                    <td className="uk-table-expand">
                      <span className="uk-text-primary">
                        { this.state.box.name }
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="uk-table-shrink">
                      <small className="uk-text-bold uk-text-nowrap">お支払い<wbr/>金額</small>
                    </td>
                    <td className="uk-table-expand">
                      <div className="uk-text-primary">
                        {"¥ "+ PriceUtil.putComma(this.state.price) }
                      </div>
                      { (()=>{
                        if(this.props.code.data != null) {
                          return (
                            <small>
                              ※{this.props.code.data.price}円割引済み<br/>
                              { this.props.code.data.code }
                            </small>      
                          );
                        }
                      })() }
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr className="uk-margin-small" />

              <div className="uk-margin uk-child-width-1-2 uk-grid-small" {...{'uk-grid': ''}}>
                <div>
                  <Link to={PathGenerator.purchase("credit", this.state.box.id)} className="uk-button uk-button-primary uk-width-1-1 uk-padding-remove" ga={{category: "purchase_confirm", action: "tap_correct", label: "",nonInteraction: true}}>
                    修正する
                  </Link>
                </div>
                <div>
                  <Button className="uk-button uk-button-primary uk-width-1-1 uk-padding-remove" onClick={this.toPurchase} ga={{category: "purchase_confirm", action: "tap_purchase", label: "",nonInteraction: true}}>
                    購入する
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
      user: state.user,
      card: state.card,
      code: state.code
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
      setError,
      editUser: (userId, data) => dispatch(editUser(userId, data)),
      purchase: (data) => dispatch(purchase(data)),
      getBox: (id) => dispatch(getBox(id))
    }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfirmScreen))