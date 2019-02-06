import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Immutable from "immutable"

import Meta from "../../components/layout/Meta";
import { HeaderText, Header2Text } from "../../components/util/Text";
import { getUser, getPurchases, editUser, editPassword, deleteUser } from "../../actions/user";
import { logout } from "../../actions/auth";
import { Path, PathGenerator } from "../../constants/path";
import { DateUtil } from "../../utils/date";
import { StringUtil } from "../../utils/string";

import { Link, Button } from "../../components/util/Clickable";
import UserDetailForm from "../../components/forms/UserDetailForm";
import UserAuthForm from "../../components/forms/UserAuthForm";
import MessageModal from "../../components/part/MessageModal";
import ConfirmModal from "../../components/part/ConfirmModal";
import { PurchaseStatus } from "../../constants/status";

class MyPageScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      initValue: {},
      user: {},
      purchases: [],
      recieves: [],
      message: "",
      authmessage: "",
      detail: {
        purchases: false,
        recieves: false 
      },
    };
  }

  componentDidMount = () => {
    this.setState( Immutable.fromJS(this.state)
      .updateIn(["user"], v => this.props.user.user)
      .toJS()
    );

    this.props.actions.getPurchases(this.props.auth.userId).then( ({value, action}) => {
      if(value.status < 300){
        this.setState( Immutable.fromJS(this.state)
          .updateIn(["user"], v => value.data )
          .updateIn(["purchases"], v => value.data.purchases )
          .updateIn(["recieves"], v => value.data.recieves )
          .updateIn(["initValue"], v => this.createInitValue(value.data) )
          .toJS()
        );
      }
    }).catch( error => console.log(error) );
  }

  createInitValue = (user) =>{
    var birthday = null;
    if( user.birthday != null ){
      birthday = DateUtil.toDate(user.birthday);  
    }

    return {
      email: user.email,
      name: user.name,
      birthday: {
        year:  birthday != null ? birthday.getFullYear() : null,
        month: birthday != null ? birthday.getMonth() + 1 : null,
        date:  birthday != null ? birthday.getDate() : null
      },
      gender: user.gender,
      tel: user.tel,
      opted_out: user.opted_out == 1
    };
  }

  onSubmit = (values) => {
    var param = Object.assign({}, values);
    param["birthday"] = param["birthday"]["year"] + "-" + param["birthday"]["month"] + "-" + param["birthday"]["date"];
    param["opted_out"] = param["opted_out"] ? 1 : 0;

    this.props.actions.editUser( this.state.user.id, param ).then( ({value, action}) => {
      this.setState( Immutable.fromJS(this.state)
        .updateIn(["message"], v => value.errors != null ? StringUtil.messageFormErrors(value.errors) : value.message )
        .toJS()
      );
    });
  }

  onSubmitPassword = (values) => {
    this.props.actions.editPassword( this.state.user.id, values ).then( ({value, action}) => {
      this.setState( Immutable.fromJS(this.state)
        .updateIn(["authmessage"], v => value.errors != null ? StringUtil.messageFormErrors(value.errors) : value.message )
        .toJS()
      );
    });
  }

  onDelete = () => {
    this.props.actions.deleteUser( this.state.user.id ).then( ({value, action}) => {
      if( value.status < 300 ){
        this.completedModal.openModal();    
      }
    }).catch( error => console.log(error) );
  }

  onComplete = () => {
    this.props.actions.logout();
    this.props.history.push( Path.root.url );
  }

  onShowDetail = (mode) => {
    this.setState( Immutable.fromJS(this.state)
      .updateIn(["detail", mode], v => true )
      .toJS()
    );
  }

  renderNotDrawn = (purchase, index) => {
    return (
      <tr key={index}>
        <td>
          <small>
            { DateUtil.toJaDateString( DateUtil.toDate(purchase.created_at) ) }
          </small>
        </td>
        <td>
          <small className="uk-text-primary">{ purchase.box.name }</small>
          <p className="uk-margin-remove">
            まだ開封されていません
          </p>
        </td>
        <td className="uk-text-right">
          <Link className="uk-button uk-button-small uk-button-primary uk-margin-small-right" to={PathGenerator.item("draw", purchase.register_token )}>
            開封する
          </Link>
          <Link className="uk-button uk-button-small uk-button-primary" to={PathGenerator.item("complete", purchase.register_token )}>
            プレゼントする
          </Link>
        </td>
      </tr>
    );
  }

  renderCanceled = (purchase, index) => {
    return (
      <tr key={index}>
        <td>
          <small>
            { DateUtil.toJaDateString( DateUtil.toDate(purchase.created_at) ) }
          </small>
        </td>
        <td>
          <small className="uk-text-primary">{ purchase.box.name }</small>
          <p className="uk-margin-remove">
            キャンセルされました
          </p>
        </td>
        <td>
        </td>
      </tr>
    );
  }

  renderDrawn = (purchase, index) => {
    return (
      <tr key={index}>
        <td>
          <small>
            { DateUtil.toJaDateString( DateUtil.toDate(purchase.created_at) ) }
          </small>
        </td>
        <td>
          <small className="uk-text-primary">{ purchase.box.name }</small>
          <p className="uk-margin-remove">
            { purchase.content.name }<br/>
            { purchase.content.number }<br/>
            <br/>
          </p>
        </td>
        <td>
          <p>
            { purchase.reciever.name }さんが受け取りました
          </p>
        </td>
      </tr>
    );
  }

  renderRecieves = (purchase, index) => {
    return (
      <tr key={index}>
        <td>
          <small>
            { DateUtil.toJaDateString( DateUtil.toDate(purchase.created_at) ) }
          </small>
        </td>
        <td>
          <small className="uk-text-primary">{ purchase.box.name }</small>
          <p className="uk-margin-remove">
            { purchase.content.name }<br/>
            { purchase.content.number }<br/>
            <br/>
          </p>
          <p>
            { purchase.user.name }さんから受け取りました
          </p>

          { ( () => {
            if( purchase.status == PurchaseStatus.CANCELED ) {
              return (
                <div className="uk-text-right">
                  <small>
                    キャンセルされました
                  </small>
                </div>
              );
            }else{
              return (
                <div className="uk-text-right">
                  <Link className="uk-button uk-button-small uk-button-primary" to={PathGenerator.item("detail", purchase.register_token )}>
                    チケット詳細
                  </Link>
                </div>
              );
            }
          } )() }

          
        </td>
      </tr>
    );
  }

  render = () => {
    return (
      <div>
        <Meta title="マイページ" />
        <div className="uk-section uk-section-large">
          <div className="uk-container uk-container-small">

            <div className="uk-margin-large">
              <HeaderText>
                あなたの購入履歴
              </HeaderText>

              <div className="uk-margin uk-position-relative">

                {(()=>{
                  if( this.state.purchases.length > 0 ){
                    return (
                      <table className="uk-table uk-table-small uk-table-striped uk-table-responsive">
                        <thead>
                          <tr>
                            <th>購入日</th>
                            <th>体験詳細</th>
                            <th>受け取った人</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            this.state.purchases.filter( (purchase, index) => {
                              return index < 3 || this.state.detail.purchases;
                            } ).map( (purchase, index) => {
                              if(purchase.status >= PurchaseStatus.DRAWED ){
                                return this.renderDrawn(purchase, index);  
                              }else if(purchase.status >= PurchaseStatus.CANCELED ){
                                return this.renderCanceled(purchase, index);
                              }else{
                                return this.renderNotDrawn(purchase, index);
                              }
                            })
                          }
                        </tbody>
                      </table>
                    );
                  }else{
                    return (
                      <h3 className="uk-text-center">
                        購入履歴はまだありません。
                      </h3>
                    );
                  }
                })()}              

                { (()=>{
                  if( this.state.purchases.length > 3 && !this.state.detail.purchases){
                    return (
                      <Link className="uk-display-block uk-reset-link uk-detail-cover uk-position-bottom uk-text-center" onClick={() => this.onShowDetail('purchases')}>
                        <small className="uk-text-primary uk-position-bottom uk-position-small">
                          履歴を全て見る
                        </small>
                      </Link>
                    );
                  }
                })() }
              </div>
            </div>

            <div className="uk-margin-large">
              <HeaderText>
                あなたの受取履歴
              </HeaderText>

              <div className="uk-margin uk-position-relative">

                {(()=>{
                  if( this.state.recieves.length > 0 ){
                    return (
                      <table className="uk-table uk-table-small uk-table-striped uk-table-responsive">
                        <thead>
                          <tr>
                            <th>購入日</th>
                            <th>体験詳細</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            this.state.recieves.filter( (purchase, index) => {
                              return index < 3 || this.state.detail.recieves;
                            }).map( (purchase, index) => {
                              return this.renderRecieves(purchase, index);
                            })
                          }
                        </tbody>
                      </table>
                    );
                  }else{
                    return (
                      <h3 className="uk-text-center">
                        受取履歴はまだありません。
                      </h3>
                    );
                  }
                })()} 

                
                { (()=>{
                  if( this.state.recieves.length > 3 && !this.state.detail.recieves){
                    return (
                      <Link className="uk-display-block uk-reset-link uk-detail-cover uk-position-bottom uk-text-center" onClick={() => this.onShowDetail('recieves')}>
                        <small className="uk-text-primary uk-position-bottom uk-position-small">
                          履歴を全て見る
                        </small>
                      </Link>
                    );
                  }
                })() }
              </div>
            </div>

          </div>  
        </div>

        <hr />

        <div className="uk-section uk-section-large">
          <div className="uk-container uk-container-small">

            <div className="uk-margin-large">
              <HeaderText>
                プロフィールの編集
              </HeaderText>
              {(()=>{
                if(this.state.initValue.email != null){
                  return (
                    <UserDetailForm initialValues={this.state.initValue} onSubmit={this.onSubmit} buttonText="更新" message={this.state.message} editing={true} />
                  );
                }
              })()}
            </div>


            <div className="uk-margin-large">
              <HeaderText>
                パスワードの編集
              </HeaderText>
              {(()=>{
                if(this.state.initValue.name != null){
                  return (
                    <UserAuthForm onSubmit={this.onSubmitPassword} buttonText="更新" message={this.state.authmessage} editing={true} />
                  );
                }
              })()}
            </div>
          
            <hr />
            <div className="uk-margin uk-text-center">
              <Link className="uk-button uk-button-muted" to={Path.auth.logout.url}>
                ログアウト
              </Link>
            </div>
            <hr />

            <div className="uk-margin uk-text-center">
              <small>
                退会をご希望の方は
                <Link onClick={ () => {
                  this.confirmModal.openModal();
                } }>
                  こちら
                </Link>
                から
              </small>
            </div>
            
            <ConfirmModal id="confirm-modal" ref={ confirmModal => this.confirmModal = confirmModal } title={"本当に退会しますか？"} message={"一度退会されると今までの利用履歴の閲覧や受け取ったチケット等が利用できなくなります。"} onOK={this.onDelete} />

            <MessageModal id="completed-modal" ref={ completedModal => this.completedModal = completedModal } title={"退会を受け付けました"} message={"ご利用ありがとうございました。\nまたのご利用をお待ちしております。"} onClose={this.onComplete} />
          </div>  
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
      user: state.user,
      auth: state.auth
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
      logout,
      getUser: (userId) => dispatch(getUser(userId)),
      getPurchases: (userId) => dispatch(getPurchases(userId)),
      editUser: (userId, data) => dispatch(editUser(userId, data)),
      editPassword: (userId, data) => dispatch(editPassword(userId, data)),
      deleteUser: (userId) => dispatch(deleteUser(userId)),
    }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyPageScreen))