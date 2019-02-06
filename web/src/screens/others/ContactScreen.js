import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Meta from "../../components/layout/Meta";
import { Link, Button } from "../../components/util/Clickable";
import ContactForm from "../../components/forms/ContactForm";
import { HeaderText, Header2Text } from "../../components/util/Text";
import MessageModal from "../../components/part/MessageModal";
import { Path, ExternalPath } from "../../constants/path"
import { sendContact } from "../../actions/contact";

class ContactScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      message: "",
    };
  }

  onSubmit = (values) => {
    this.setState({
      message: ""
    });
    this.props.actions.sendContact( values ).then( ({value, action}) => {
      if(value.status < 300){
        this.messageModal.openModal();
      }else{
        this.setState({
          message: value.message
        });
      }
    }).catch( error => console.log(error) );
  }

  render = () => {
    return (
      <div>
        <Meta title="お問い合わせ" />
        <div className="uk-section uk-section-large">
          <div className="uk-container uk-container-ssmall">
            <HeaderText>
              お問い合わせフォーム
            </HeaderText>

            <div className="uk-margin">
              <ContactForm onSubmit={ this.onSubmit } message={this.state.message} />
            </div>
            <MessageModal id="message-modal" ref={ messageModal => this.messageModal = messageModal }
                title={"ありがとうございます"}
                message={"お問い合わせを受け付けました。\n内容に応じて2~3営業日を目安に弊社担当者からご連絡させていただきます。\n今後ともよろしくお願いします。"} />
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
      sendContact: (data) => dispatch( sendContact(data) )
    }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContactScreen))