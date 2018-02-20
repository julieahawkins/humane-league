import React, { Component } from 'react';
import TwitterCard from '../ActionCard/TwitterCard';
import FacebookCard from '../ActionCard/FacebookCard';
import EmailCard from '../ActionCard/EmailCard';
import PhoneCard from '../ActionCard/PhoneCard';
import './ActionContainer.css';
import '../ActionCard/ActionCard.css';

class ActionContainer extends Component {
  constructor() {
    super();
    this.state = {
      twitter: [],
      facebook: [],
      email: [],
      phone: []
    }
  }
  async componentDidMount() {

    const twitterFetch = await fetch('/api/v1/twitter_actions');
    const twitterActions = await twitterFetch.json();
    const twitter = twitterActions.results;

    const facebookFetch = await fetch('/api/v1/facebook_actions');
    const facebookActions = await facebookFetch.json();
    const facebook = facebookActions.results;

    
    const emailFetch = await fetch('/api/v1/email_actions');
    const emailActions = await emailFetch.json();
    const email = emailActions.results;


    const phoneFetch = await fetch('/api/v1/phone_actions');
    const phoneActions = await phoneFetch.json();
    const phone = phoneActions.results;

    await this.setState({ twitter, facebook, email, phone });
  };

  render() {
    const twitterCards = this.state.twitter.map((action, i) => <TwitterCard key={`twitter-${i}`} action={action}/>);
    const facebookCards = this.state.facebook.map((action, i) => <FacebookCard key={`facebook-${i}`} action={action}/>);
    const emailCards = this.state.email.map((action, i) => <EmailCard key={`email-${i}`} action={action}/>);
    const phoneCards = this.state.phone.map((action, i) => <PhoneCard key={`phone-${i}`} action={action}/>);

    return (
      <div className="ActionContainer">
        <h1>FAN ACTION ALERTS</h1>
        {twitterCards}
        {facebookCards}
        {emailCards}
        {phoneCards}
      </div>
    );
  }
}

export default ActionContainer;