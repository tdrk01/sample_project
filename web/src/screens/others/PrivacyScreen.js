import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Meta from "../../components/layout/Meta";
import { HeaderText, Header2Text } from "../../components/util/Text";
import email from "../../assets/images/docs/email.png";

class PrivacyScreen extends Component {
  render = () => {
    return (
      <div>
        <Meta title="プライバシーポリシー" />
        <div className="uk-section uk-section-large">
          <div className="uk-container uk-container-small">

            <HeaderText>
              プライバシーポリシー
            </HeaderText>
            
            <p>
              株式会社TODOROKI（以下「当社」）は、当社がインターネット上で提供するウェブサイト（以下「本サービス」といいます）をご利用いただいた方（以下「ユーザー」といいます）の個人を識別しうる情報を適切に保護することが社会的責務として重要と考え、個人情報に関する法令及び社内規程 等を遵守し、当社で取扱う個人情報の取得、利用、管理を適正に行います。
            </p>


            <Header2Text>
              第1条（個人情報の定義）
            </Header2Text>
            <p>
            個人情報とは、氏名、住所、電話番号、E-メールアドレス、購入履歴、その他の記述等により特定の個人を識別することができるもの（他の情報と容易に照合することができ、それにより特定の個人を識別することができるものを含みます。）など個人を特定できる情報、もしくはその可能性のある情報を指します。
            </p>

            <Header2Text>
            第2条（個人情報の管理およびセキュリティについて）
            </Header2Text>
            <p>
            当社では、収集したユーザー情報を、一般の利用者がアクセスできない環境下にあるサーバーにて安全に保管し、不正アクセス・紛失・破壊・改ざんまたは漏洩が生じないよう努めます。
            </p>

            <Header2Text>
            第3条（個人情報の取得・収集について）
            </Header2Text>
            <p>
              当社は、本サービスの提供に必要な範囲内で、偽りその他不正の手段によらず適法かつ公正な手段により、本サービスをご利用になるユーザーの個人情報を取得します。
            </p>

            <Header2Text>
            第4条（個人情報の利用目的について）
            </Header2Text>

            <p>
            当社は、ユーザー情報を以下の目的にのみ利用します。<br/>
            1.本サービスにおける商品を提供するため<br/>
            2.本サービスにおける取引の状態など重要な事項を連絡するため<br/>
            3.本サービスにおける決済内容の確認をするため<br/>
            4.本サービスへの登録確認のため<br/>
            5.本サービス運営上のトラブルの解決のため<br/>
            6.ユーザーから本サービスに関するお問い合わせへの対応、その他のユーザーに本サービスを快適にご利用いただくため<br/>
            7.本サービスの利用状況の分析その他の方法による本サービスの改善のため<br/>
            8.ユーザーに対する電子メール等による本サービスに関する情報の提供のため<br/>
            9.当社が提供する本サービス以外のサービスに関するご案内の提供のため<br/>
            10.本サービスに関する規約等の変更などを通知するため<br/>
            11.上記の利用目的に付随する利用目的のため
            </p>

            <Header2Text>
            第5条（個人情報の第三者への預託、提供について）
            </Header2Text>
            <p>
            当社は、利用者情報のうち、個人情報については、個人情報保護法その他の法令に基づき開示が認められる場合を除くほか、あらかじめユーザーの同意を得ないで、第三者に提供しません。但し、次に掲げる場合はこの限りではありません。<br/>
            <br/>
            1.当社が利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合<br/>
            2.合併その他の事由による事業の承継に伴って個人情報が提供される場合<br/>
            3.国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、ユーザーの同意を得ることによって当該事務の遂行に支障を及ぼすおそれがある場合<br/>
            4.その他、個人情報保護法その他の法令で認められる場合
            </p>

            <Header2Text>
            第6条（Cookieの使用について）
            </Header2Text>
            <p>
            Cookie情報について<br/>
            当社ではCookie情報を使用し、当サイトにアクセスしたユーザーの閲覧したページ、利用時間帯などの行動履歴情報を取得しております。<br/>
            収集した行動履歴情報は、ユーザーのプライバシーの保護、利便性の向上、広告効果の最適化、および利用状況の把握のために用いられます。これらのデータは匿名であり、氏名、住所、生年月日などの個人情報を含むものではありません。<br/>
            <br/>
            アクセス解析について<br/>
            当社ではサイトの利用状況を解析するGoogle Analyticsを用いております。<br/>
            Google Analyticsは、Cookie情報を利用して利用者の情報を収集します。<br/>
            Google Analyticsの利用規約に関する説明についてはGoogle Analyticsのポリシーと原則（http://www.google.com/intl/ja/policies/）をご覧ください。<br/>
            <br/>
            効果的な広告表示について<br/>
            当社では、ユーザーに適切な広告を配信するため、以下の提携会社のサービスを利用し、ユーザーの閲覧履歴に基づいてユーザーごとに広告の内容をカスタマイズすることがあります。当サービスで利用するCookie情報は広告配信の目的にのみ使用し、その他の目的や個人情報の収集には一切使用しません。<br/>
            なお、Cookie情報を無効にしたい場合は、以下の提携会社各社のオプトアウトページにアクセスし、手順に沿ってCookieを無効化してください。また、利用者がご自身でCookieの受取りを拒否する、またはCookie情報を受け取った場合に警告を表示させるようブラウザの設定を変更することができます（詳しくはご使用のブラウザの説明をご参照下さい）。ただし、Cookie情報の受取を拒否される等した場合、本サービスの一部がご利用できなくなる場合もあります（たとえば、本サービスにおいてログインをした上でないと利用できない各サービスについて、利用できなくなります）。<br/>
            ・グーグル株式会社<br/>
            ・ヤフー株式会社<br/>
            ・Facebook,Inc.
            </p>

            <Header2Text>
            第7条（当社によるユーザー情報の訂正について）
            </Header2Text>
            <p>
            ご登録いただいたユーザー情報のうち、市町村などの名称および郵便番号など、ご連絡を行う上で支障がある情報に変更があった場合には、当社が登録されているユーザー情報を変更させていただく場合があります。
            </p>

            <Header2Text>
            第8条（免責・注意事項について）
            </Header2Text>
            <p>
            当社は、本サービスのウェブページにリンクされている他の事業者または個人のウェブサイトにおけるユーザーの個人情報等の保護について、責任を負うものではありません。ユーザーご自身にて当該ウェブサイトの内容をよくご確認の上で、閲覧およびご利用をお願いいたします。<br/>
            ユーザーご本人を確認するための情報につきましては、ユーザーにて、紛失、忘失または第三者に知られることのないよう厳重な管理をお願いいたします。
            </p>

            <Header2Text>
            第9条（プライバシーポリシーの改善について）
            </Header2Text>
            <p>
            当社は、プライバシーポリシーについて、適宜その改善に努めます。ユーザーは本サービスをご利用になる前に、必ず最新のユーザー情報の取扱規定をご確認ください。ユーザーが本ウェブサイトにアクセスされるか当社の本サービスをご利用になられた場合は、最新のプライバシーポリシーの内容に同意されたものとみなします。
            </p>

            <Header2Text>
            第10条（ユーザー情報の開示・訂正・利用停止等の手続きについて）
            </Header2Text>
            <p>
            ユーザーは、ご登録いただいたログインIDとパスワードで本サービスにログインしていただき、会員登録時にご登録いただいたユーザーの情報をご確認・訂正を行っていただくことができます。<br/>
            また、当社はユーザーから、個人情報保護法の定めに基づき個人情報の開示を求められたときは、ユーザーご本人からのご請求であることを確認の上で、ユーザーに対し、遅滞なく開示を行います（当該個人情報が存在しないときにはその旨を通知いたします。）。但し、個人情報保護法その他の法令により、当社が開示の義務を負わない場合は、この限りではありません。なお、個人情報の開示につきましては、手数料（1件あたり1,000円）を頂戴しておりますので、あらかじめ御了承ください。
            </p>

            <Header2Text>
            第11条（個人情報に関するお問合せ先）
            </Header2Text>
            <p>
            株式会社TODOROKI　顧客相談窓口<br/>
            Eメール: <img src={email} /><br/>
            【サービスに関するお問合せ先ではございません】<br/>
            <br/>
            以上　<br/>
            <br/>
            策定　平成30年4月27日
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivacyScreen))