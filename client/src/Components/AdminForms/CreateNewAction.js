import React, { Component } from 'react';
import './AdminForms.css';

class CreateNewAction extends Component {
  constructor() {
    super();
    this.state = {
      form: 'facebook',
      enabled: true
    }
  }

  handleChange = () => {
    const form = this.refs.actionTypes.value;

    this.setState({ form });
  }

  render() {
    const socialMediaTarget = {
      targetUrl: <input type='text' placeholder='Target Url' />
    }  
    const emailTarget = {
      to: <input type='text' placeholder='Target Email Address' />,
      cc: <input type='text' placeholder='CCs' />,
      bcc: <input type='text' placeholder='BCCs' />,
      subject: <input type='text' placeholder='Email Subject' />,
    }
    const phoneTarget = {
      name: <input type='text' placeholder='Target Name' />,
      position: <input type='text' placeholder='Target Position' />,
      phoneNumber: <input type='text' placeholder='Target Phone Number' />
    }
    const form = {
      facebook: socialMediaTarget,
      twitter: socialMediaTarget,
      email: emailTarget,
      phone: phoneTarget
    }

    return (
      <div className='create-new-action-container'>
        <h1>CREATE A NEW ACTION</h1>
        <section className='select-action-container'>
          <label htmlFor='action-types'>Select Action Type:
            <select onChange={() => this.handleChange()} ref='actionTypes' name='action-types' id='action-types'>
              <option value='facebook'>Facebook</option>
              <option value='twitter'>Twitter</option>
              <option value='email'>Email</option>
              <option value='phone'>Phone</option>
            </select>
          </label>
          <section className='create-action-form'>
            <h2>{this.state.form.toUpperCase()}</h2>
            <form action='create-new-action-form'>
              <input type='text' placeholder='Action Title' />
              <input type='text' placeholder='Action Description' />
              {form[this.state.form].targetUrl}

              {form[this.state.form].to}
              {form[this.state.form].cc}
              {form[this.state.form].bcc}
              {form[this.state.form].subject}

              {form[this.state.form].name}
              {form[this.state.form].position}
              {form[this.state.form].phoneNumber}

              <div className='enable-toggle'>
                <span 
                  id='toggle'>
                  <input
                    ref={input => this.checkbox = input} 
                    type='checkbox' 
                    checked={this.state.enabled}
                    onChange={() => this.setState({ enabled: !this.state.enabled })}
                  />
                  <label 
                    data-on='enabled' 
                    data-off='disabled'>
                  </label>
                </span>
              </div>    
              <input type='text' placeholder='Action Content' />
              <button>CREATE THIS ACTION</button>
            </form>
          </section>
        </section>
      </div>
    )
  }
}

export default CreateNewAction;