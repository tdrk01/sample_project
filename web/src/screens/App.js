import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import LoadingBar from 'react-redux-loading-bar'
import { Path } from '../constants/path'
import PrivateRoute from "../components/util/PrivateRoute";
import Header from '../components/layout/Header'
import Footer from "../components/layout/Footer"
import Meta from "../components/layout/Meta";

import RootScreen from "./RootScreen"
import LawScreen from "./others/LawScreen";
import ContactScreen from "./others/ContactScreen";
import HelpScreen from "./others/HelpScreen";
import PrivacyScreen from "./others/PrivacyScreen";
import TermScreen from "./others/TermScreen";

import LoginScreen from "./auth/LoginScreen";
import DetailScreen from "./auth/DetailScreen";
import RegisterScreen from "./auth/RegisterScreen";
import LogoutScreen from "./auth/LogoutScreen";
import ForgetScreen from "./auth/ForgetScreen";
import ResetScreen from "./auth/ResetScreen";
import SocialLoginedScreen from "./auth/SocialLoginedScreen";

import CreditScreen from "./purchase/CreditScreen";
import ConfirmScreen from "./purchase/ConfirmScreen";

import CompleteScreen from "./items/CompleteScreen";
import ContentDetailScreen from "./items/ContentDetailScreen";
import DrawScreen from "./items/DrawScreen";
import TicketScreen from "./items/TicketScreen";
import PreviewScreen from "./contents/PreviewScreen";
import MyPageScreen from "./user/MyPageScreen";

import SampleCompleteScreen from "./samples/SampleCompleteScreen";
import SampleDrawScreen from "./samples/SampleDrawScreen";
import SampleDetailScreen from "./samples/SampleDetailScreen";

import NotFoundScreen from "./NotFoundScreen"

import BoxesModal from "../components/part/BoxesModal";
import GoogleTagManager from "../components/layout/GoogleTagManager";

class App extends Component {

  render = () => {
    return (
      <Router>
        <div className="uk-position-relative uk-offcanvas-content">
          <Switch>
            <Route exact path={Path.root.url}>
              <Header height={400}></Header>
            </Route>
            <Route path={Path.auth.url}></Route>
            <Route path={Path.purchase.url}></Route>
            <Route path={Path.items.url}></Route>
            <Route path={Path.samples.url}></Route>
            <Route>
              <Header />
            </Route>
          </Switch>
          <LoadingBar className="uk-position-fixed uk-position-z-index" style={{ top: '0px', width: '100%', backgroundColor: '#ff5522', height: '5px', zIndex: 1000 }} />
          <div className="main">
            <Switch>
              <Route exact path={Path.root.url} component={RootScreen} />
              <Route exact path={Path.auth.login.url} component={LoginScreen} />
              <Route exact path={Path.auth.register.url} component={RegisterScreen} />
              <Route exact path={Path.auth.detail.url} component={DetailScreen} />
              <Route exact path={Path.auth.logout.url} component={LogoutScreen} />
              <Route exact path={Path.auth.forget.url} component={ForgetScreen} />
              <Route exact path={Path.auth.reset.url} component={ResetScreen} />
              <Route exact path={Path.auth.social.url} component={SocialLoginedScreen} />

              <Route exact path={Path.others.privacy.url} component={PrivacyScreen} />
              <Route exact path={Path.others.help.url} component={HelpScreen} />
              <Route exact path={Path.others.contact.url} component={ContactScreen} />
              <Route exact path={Path.others.term.url} component={TermScreen} />
              <Route exact path={Path.others.law.url} component={LawScreen} />
              <Route exact path={Path.contents.view.url} component={PreviewScreen} />
              

              <PrivateRoute exact path={Path.purchase.credit.url} component={CreditScreen} />
              <PrivateRoute exact path={Path.purchase.confirm.url} component={ConfirmScreen} />

              <PrivateRoute exact path={Path.items.complete.url} component={CompleteScreen} />
              <PrivateRoute exact path={Path.items.detail.url} component={ContentDetailScreen} />
              <PrivateRoute exact path={Path.items.ticket.url} component={TicketScreen} />

              <PrivateRoute exact path={Path.samples.complete.url} component={SampleCompleteScreen} />
              <Route exact path={Path.samples.draw.url} component={SampleDrawScreen} />
              <Route exact path={Path.samples.detail.url} component={SampleDetailScreen} />

              <PrivateRoute exact path={Path.user.url} component={MyPageScreen} />

              <Route exact path={Path.items.draw.url} component={DrawScreen} />

              <Route component={NotFoundScreen} />
            </Switch>
          </div>
          <Footer />
          <BoxesModal />

          {(()=>{
            if(process.env.REACT_APP_GOOGLE_TAG != null && process.env.REACT_APP_GOOGLE_TAG.length > 0){
              return (
                <GoogleTagManager gtmId={process.env.REACT_APP_GOOGLE_TAG} />      
              );
            }
          })()}
          <div id="scroller"></div>
        </div>
      </Router>
    );
  }
}
export default (App);
