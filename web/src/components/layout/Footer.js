import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ReactGA from 'react-ga';
import { Path, ExternalPath } from "../../constants/path";
import footer from "../../assets/images/material/footer.jpg";
import { Link, Button } from "../util/Clickable";

import News from "../part/News";

class Footer extends Component {

  componentDidMount = () => {
    if( process.env.REACT_APP_GOOGLE_ANALYTICS_TAG != null && process.env.REACT_APP_GOOGLE_ANALYTICS_TAG.length > 0 ){
      ReactGA.set({ userId: this.props.auth.userId });
    }
  }

  componentDidUpdate = (nextProps, prevState) => {
    window.scrollTo(0,0);
  }

  render = () => {
    return (
      <div>

        <div className="uk-section uk-section-large  uk-position-relative">
          <div className="uk-position-cover uk-image-wrapper" style={{'zIndex': -1}}>
            <img src={footer} />
          </div>

          <div className="uk-container uk-container-small">
            <p className="uk-text-white uk-text-nowrap">
              tamate bacoは<wbr/>
              まだ出会ったことのない感動を<wbr/>お届けします
            </p>
          </div>
        </div>

        <News />

        <footer className="uk-section uk-section-secondary uk-position-relative">
          <div className="uk-container uk-container-small uk-margin-large-bottom">

            <div className="uk-child-width-1-2@m" {...{'uk-grid':''}}>
              <div>
                <ul className="uk-list">
                  <li>
                    <Link to={Path.root.url} className="uk-link-reset uk-width-1-1 uk-display-block">
                      トップページ
                    </Link>
                  </li>
                  {(()=>{
                    if(this.props.auth.auth_token){
                      return (
                        <li>
                          <Link to={Path.user.url} className="uk-link-reset uk-width-1-1 uk-display-block">
                            マイページ
                          </Link>
                        </li>
                      );
                    }else{
                      return (
                        <li>
                          <Link to={Path.auth.login.url} className="uk-link-reset uk-width-1-1 uk-display-block">
                            ログイン
                          </Link>
                        </li>
                      );
                    }
                  })()}
                  {(()=>{
                    if(this.props.auth.auth_token){
                      return (
                        <li>
                          <Link to={Path.auth.logout.url} className="uk-link-reset uk-width-1-1 uk-display-block">
                            ログアウト
                          </Link>
                        </li>
                      );
                    }
                  })()}

                </ul>
              </div>
              <div>
                <ul className="uk-list">
                  <li>
                    <Link target="_blank" href={ExternalPath.company} className="uk-link-reset uk-width-1-1 uk-display-block">
                      会社概要
                    </Link>
                  </li>
                  <li>
                    <Link target="_blank" to={Path.others.privacy.url} className="uk-link-reset uk-width-1-1 uk-display-block">
                      プライバシーポリシー
                    </Link>
                  </li>
                  <li>
                    <Link target="_blank" to={Path.others.law.url} className="uk-link-reset uk-width-1-1 uk-display-block">
                      特定商取引法に関して
                    </Link>
                  </li>
                  <li>
                    <Link target="_blank" to={Path.others.term.url} className="uk-link-reset uk-width-1-1 uk-display-block">
                      利用規約
                    </Link>
                  </li>
                  <li>
                    <Link to={Path.others.help.url} className="uk-link-reset uk-width-1-1 uk-display-block">
                      ヘルプ
                    </Link>
                  </li>
                  <li>
                    <Link to={Path.others.contact.url} className="uk-link-reset uk-width-1-1 uk-display-block">
                      お問い合わせ
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="uk-position-bottom uk-background-black">
            <p className="uk-text-center uk-text-white uk-margin-small-bottom uk-margin-small-top">
              <small>© 2018 TODOROKI Inc.</small>
            </p>
          </div>
        </footer>
      </div>
    );
  }
}


const mapStateToProps = state => {
    return {
      auth: state.auth
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
    }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Footer))
