import React, {Component} from 'react';
import './UserProfile.css';
import { connect } from 'react-redux';
import * as actions from '../../Actions';

class UserProfile extends Component {
  constructor () {
    super();
    this.state = {
      fullName: '',
      emailAddress: '',
      actionCount: null,
      twitter_actions: null,
      facebook_actions: null,
      email_actions: null,
      phone_actions: null
    };
  }

  async componentDidMount () {
    console.log(this.props.user);
    this.setState({ fullName: this.props.user.name, emailAddress: this.props.user.email });

    const actionLogFetch = await fetch('/api/v1/actions');
    const actionLog = await actionLogFetch.json();

    const userActions = actionLog.results.filter(action => action.user_id === this.props.user.id);
    this.setState({ actionCount: userActions.length });

    const { twitter_actions, facebook_actions, email_actions, phone_actions } = this.props.user;
    this.setState({ twitter_actions, facebook_actions, email_actions, phone_actions });
  }

  changeClick = (event) => {
    this.setState({ [event.target.value]: !this.state[event.target.value] });
  }

  patchPreferences = async (event) => {
    event.preventDefault();
    const preferencePath = await fetch(`/api/v1/users/${this.props.user.id}?token=${this.props.user.id_token}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...this.state })
    });

    if (preferencePath.status === 204) {
      this.updateLocal();
      this.props.updatePrefs(this.state);
    }
  };

  updateLocal = () => {
    const { user } = JSON.parse(localStorage.getItem('THL-FAN-USER'));
    const updatedUser = Object.assign({}, user, {...this.state});

    localStorage.setItem('THL-FAN-USER', JSON.stringify({ user: updatedUser }));
  }

  render () {
    return (
      <div className="UserProfile">
        <h1>{`Profile for ${this.props.user.name}`}</h1>
        
        <div className="user-achievements">
          <h2>User Achievements</h2>
          <p>{`You have completed ${this.state.actionCount} actions! Great job!`}</p>
        </div>
        
        <div className="user-preferences">
          <h2>Action Preferences</h2>

          <form className="user-preferences-form">
            <label> Twitter Actions
              <input className="checkbox" type="checkbox" value="twitter_actions" checked={this.state.twitter_actions} onChange={this.changeClick}/>
            </label>
            <label> Facebook Actions
              <input className="checkbox" type="checkbox" value="facebook_actions" checked={this.state.facebook_actions} onChange={this.changeClick}/>
            </label>
            <label> Email Actions
              <input className="checkbox" type="checkbox" value="email_actions" checked={this.state.email_actions} onChange={this.changeClick}/>
            </label>
            <label> Phone Actions
              <input className="checkbox" type="checkbox" value="phone_actions" checked={this.state.phone_actions} onChange={this.changeClick}/>
            </label>
            
            <button onClick={this.patchPreferences}>SAVE</button>
          </form>
        </div>

        <div className="user-profile-edit">
          <h2> Edit Your Profile</h2>

          <form className="user-profile-form">
            <label> Name: 
              <input className="text-input" onChange={(e) => this.setState({fullName: e.target.value})} value={this.state.fullName} />
            </label>
            <label> Email: 
              <input className="text-input" onChange={(e) => this.setState({emailAddress: e.target.value})} value={this.state.emailAddress} />
            </label>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  user: store.User
});

const mapDispatchToProps = dispatch => ({
  updatePrefs: newPrefs => dispatch(actions.updatePrefs(newPrefs))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);