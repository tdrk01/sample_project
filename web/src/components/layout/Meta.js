import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Helmet from 'react-helmet';

import { Path } from '../../constants/path';

const defaults = {
  name: "tamate baco(たまてばこ)",
  title : "tamatebaco(たまてばこ) ~週末の予定は、ガチャで決めよう~",
  description: "あなたの休日を、適当に決めます。「週末はだいたい飲み会、土日は寝てる…」「大人になってから趣味、好きなことが増えてない…」tamate baco(たまてばこ) は 非日常・未体験なことを、ランダムに提案します。『まだ知らない好きなこと』に出会えるかも。『初めて』を楽しみましょう。",
  image : "https://tamateba.co/images/thumnail.jpg"
};

class Meta extends Component {

  componentDidMount = () => {
  }

  getTitle = () => {
    return this.props.title != null ? this.props.title + " | " + defaults.title : defaults.title;
  }

  getDescription = () => {
    return this.props.description != null ? this.props.description + "|" + defaults.description : defaults.description;
  }

  getImage = () => {
    return this.props.image != null ? this.props.image : defaults.image;
  }

  getUrl = () => {
    return this.props.url != null ? this.props.url : process.env.REACT_APP_URL + this.props.history.location.pathname;
  }

  render = () => {
    return (
      <div>
        <Helmet
          title={this.getTitle()}
          description={this.getDescription()}
          meta={[
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: this.getTitle() },
            { name: 'twitter:description', content: this.getDescription() },
            { name: 'twitter:image', content: this.getImage() },

            { property: 'fb:app_id', content: "171808486855793" },
            { property: 'og:title', content: this.getTitle() },
            { property: 'og:site_name', content: defaults.name },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: this.getUrl() },
            { property: 'og:image', content: this.getImage() },
            { property: 'og:description', content: this.getDescription() },
          ]}
        />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Meta))
