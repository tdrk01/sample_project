import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Meta from "../../components/layout/Meta";
import { HeaderText, Header2Text } from "../../components/util/Text";
import email from "../../assets/images/docs/email.png";
import tel from "../../assets/images/docs/tel.png";

class LawScreen extends Component {
  render = () => {
    return (
      <div>
        <Meta title="特定商取引法に関する記載事項" />
        <div className="uk-section uk-section-large">
            <div className="uk-container uk-container-small">

              <HeaderText>
                特定商取引法に関する記載事項
              </HeaderText>

              <Header2Text>
                1.事業者の名称：
              </Header2Text>

              <p>
              　株式会社TODOROKI
              </p>

              <Header2Text>
                2.代表者または通信販売に関する業務の責任者の氏名：
              </Header2Text>

              <p>
              　井上 雅也
              </p>

              <Header2Text>
                3.住所：
              </Header2Text>
              <p>
                東京都豊島区目白四丁目２​０​番１​３​号
              </p>

              <Header2Text>
                4.電話番号：
              </Header2Text>
              <p>
                <img src={tel} />
              </p>

              <Header2Text>
                5.メールアドレス：
              </Header2Text>
              <p>
              <img src={email} />
              </p>

              <Header2Text>
                6.商品の販売価格・サービスの対価：
              </Header2Text>
              <p>
              　各商品・サービスのご購入ページをご参照ください。
              </p>

              <Header2Text>
               7.対価以外に必要となる費用：
              </Header2Text>
              <p>
              　当サイトのページの閲覧、コンテンツ購入、ソフトウェアのダウンロード等に必要となるインターネット接続料金、通信料金は、お客様のご負担となります。
              </p>

              <Header2Text>
                8.代金の支払時期：
              </Header2Text>
              <p>
              クレジットカード：購入商品の確定時にお支払いが確定致します。
              </p>

              <Header2Text>
                9.支払方法：
              </Header2Text>
              <p>
              　クレジット決済
              </p>

              <Header2Text>
                10.商品引渡しまたはサービス提供の時期：
              </Header2Text>
              <p>
              　代金決済手続きの完了確認後直ちに
              </p>

              <Header2Text>
                11.返品・キャンセルに関する特約：
              </Header2Text>
              <p>
              　本サイトで販売する商品・サービスについては、購入手続き完了後の返品またはキャンセルをお受けいたしません。なお、商品・サービスに瑕疵がある場合は、利用規約の定めに従って対応します。<br/>
              　特別な販売条件または提供条件がある商品またはサービスについては、各商品またはサービスの購入ページにおいて条件を表示します。
              </p>
          </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LawScreen))