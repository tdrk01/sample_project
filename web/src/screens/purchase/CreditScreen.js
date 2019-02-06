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
import CreditForm from "../../components/forms/CreditForm";
import PromotionCodeForm from "../../components/forms/PromotionCodeForm";

import { Path, PathGenerator } from "../../constants/path";
import { setCreditData, getCardToken } from "../../actions/purchase";
import { clearMessage } from "../../actions/message";
import { setUser } from "../../actions/user";
import { getBox } from "../../actions/box";
import { checkCode, setCode } from "../../actions/code";

import { PriceUtil } from "../../utils/price";

class CreditScreen extends RemoteScreen {

  constructor(props) {
    super(props);
    this.state = {
      mesage: "",
      notFound: false,
      box: {},
      price: 0,
      showCode: false,
      code: "",
      codeSuccess: false,
      codeMessage: "",
    };
  }

  componentDidMount = () => {
    this.setState({
      message:  (this.props.message != null && this.props.message.errors != null) ? this.props.message.errors.join("\n") : ""
    });
    this.props.actions.clearMessage();
    this.props.actions.setCode( null );

    this.props.actions.getBox(this.props.match.params.boxId).then( ({value, action}) => {
      if(value.status < 300){
        this.setState(Immutable.fromJS(this.state)
          .updateIn(["box"], v => value.data)
          .updateIn(["price"], v => value.data.price)
          .toJS()
        );
      }else{
        this.didNotFound();
      }
    }).catch(error => console.log(error));
  }

  onCredit = (values) => {
    this.setState({
      message: ""
    });
    var cardInfo = {
      name: values.name,
      number: values.number,
      cvc: values.cvc,
      exp_year: values.exp.year,
      exp_month: values.exp.month,
    };
    
    this.props.actions.getCardToken(cardInfo).then( ({value, action}) => {
      var tokenId = value.id;
      var cardId = value.card.id;
      values["token_id"] = tokenId;
      values["card_id"] = cardId;
      this.props.actions.setUser(values.user);
      this.props.actions.setCreditData(values);
      this.props.history.push( PathGenerator.purchase("confirm", this.props.match.params.boxId) );
    }).catch( error => {
      this.setState(Immutable.fromJS(this.state)
        .updateIn(["message"], v => "このクレジットカードは利用できません。\nカード情報を再度確認してください。")
        .toJS()
      );
    });
  }

  onShowCode = () => {
    this.setState(Immutable.fromJS(this.state)
      .updateIn(["showCode"], v => true)
      .toJS()
    );
  }

  checkCode = (values) => {
    this.props.actions.checkCode({
      code: values.code,
      user_id: this.props.user.id,
      box_id: this.state.box.id
    }).then( ({value, action}) => {
      if(value.status < 300){
        this.setState(Immutable.fromJS(this.state)
          .updateIn(["codeSuccess"], v => true)
          .updateIn(["codeMessage"], v => "")
          .updateIn(["code"], v => values.code)
          .updateIn(["price"], v => (this.state.box.price - value.data.price) > 0 ? this.state.box.price - value.data.price: 0 )
          .toJS()
        );
        this.props.actions.setCode( value.data );
      }else{
        this.setState(Immutable.fromJS(this.state)
          .updateIn(["codeMessage"], v => "このクーポンコードは利用できません。")
          .toJS()
        );
      }
    }).catch( (error) => console.log(error) );
  }

  clearCode = () => {
    this.setState(Immutable.fromJS(this.state)
      .updateIn(["codeSuccess"], v => false)
      .updateIn(["codeMessage"], v => "")
      .updateIn(["code"], v => "")
      .updateIn(["price"], v => this.state.box.price )
      .toJS()
    );
    this.props.actions.setCode( null );
  }

  renderBox = () => {
    return (
      <div>
        <Meta title="購入フォーム" />
        <HeaderText>
          購入する商品
        </HeaderText>
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
                  <small>{ this.state.codeSuccess ? " ※割引済み" : null }</small>
                </div>
                <div className="uk-margin-small">
                  { (()=>{
                    if( !this.state.showCode ){
                      return (
                        <a onClick={ this.onShowCode }>
                          <small>
                            クーポンコードをお持ちの方
                          </small>
                        </a>
                      );
                    }else{
                      return (
                        <PromotionCodeForm onSubmit={this.checkCode} onClear={this.clearCode} success={this.state.codeSuccess} message={this.state.codeMessage} />
                      );
                    }
                  })() }
                </div>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    );
  }

  renderFound = () => {
    if(this.state.box.id == null){
      return (<div />);
    }
    return (
      <div>
        <Process step={0} />
        <div className="uk-section uk-section-large">
          <div className="uk-container uk-container-ssmall">

            <div className="uk-margin-large">
              { this.renderBox() }
            </div>

            <div className="uk-margin-large">
              <CreditForm 
                onSubmit={ this.onCredit }
                initialValues={{
                  user: this.props.user.user,
                  number: this.props.card.number,
                  name: this.props.card.name,
                  exp: this.props.card.exp,
                  cvc: this.props.card.cvc,
                }}
                middle={(
                  <div>
                    <hr />
                    <div className="uk-text-center">
                      <small>
                        <Link to={Path.others.term.url} target="_blank">
                          利用規約
                        </Link>
                        と
                        <Link target="_blank" to={Path.others.privacy.url}>
                        プライバシーポリシー
                        </Link>
                        に同意して進む
                      </small>
                    </div>
                  </div>
                )}
                message={this.state.message}
              />
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
      message: state.message,
      card: state.card
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
      clearMessage, setUser, setCode,
      getBox: (id) => dispatch(getBox(id)),
      getCardToken: (data) => dispatch( getCardToken(data) ),
      setCreditData: (data) => dispatch( setCreditData(data) ),
      checkCode: (data) => dispatch( checkCode(data) )
    }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreditScreen))