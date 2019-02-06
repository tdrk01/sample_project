import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link as NativeLink, withRouter } from 'react-router-dom'

import { Link, Button } from "../../util/Clickable";
import { HeaderText } from "../../util/Text";
import { DateUtil } from "../../../utils/date";
import AddressForm from "../../forms/AddressForm";
import { editPurchase } from "../../../actions/purchase";
import MessageModal from "../../part/MessageModal";

class SendAddress extends Component {

  constructor(props){
    super(props);
    this.state = {
      message: ""
    };
  }

  onSubmit = (values) => {
    this.props.actions.editPurchase(this.props.hash, values).then( ({value, action}) => {
      if(value.status < 300){
        this.successModal.openModal();
      }else{
        this.setState( {
          message: value.message
        });
      }
    }).catch( error => {
      console.log(error);
    });
  }

  render = () => {
    return (
      <div>
        <HeaderText>
          送付先の設定
        </HeaderText>

        {(()=>{
          if(this.props.purchase.address != null){
            return (
              <div>
                <p>
                  下記の住所への送付を受け付けました。<br/>
                  送付先に変更がある場合は<Link>問い合わせフォーム</Link>より連絡ください。
                </p>
                <table className="uk-table uk-table-middle uk-table-detail uk-margin">
                  <tbody>
                    <tr>
                      <td>郵便番号</td>
                      <td>
                        { this.props.purchase.post_code }
                      </td>
                    </tr>
                    <tr>
                      <td>住所</td>
                      <td>
                        { this.props.purchase.address }
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          }else{
            return (
              <div>
                <p>
                  商品の送付先を入力してください。
                </p>
                <div className="uk-margin">
                  <AddressForm 
                    onSubmit={ this.onSubmit }
                    message={this.state.message}
                  />
                </div> 
              </div>
            );
          }
        })()}
        
        <MessageModal id="success-modal" ref={ successModal => this.successModal = successModal } title={"ありがとうございます"} message={"送付先を受付ました。送付先に変更がある場合は問い合わせフォームからご連絡ください。"} />
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
      editPurchase: (hash, data) => dispatch( editPurchase(hash, data) )
    }, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(SendAddress);