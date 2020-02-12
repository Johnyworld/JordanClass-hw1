import React, { Component, createRef } from 'react';

const formStyle = {
  padding: '30px',
  border: '1px solid #333',
  width: '300px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '5px',
  textAlign: 'right',
  backgroundColor: 'white',
  boxShadow: '0 10px 10px rgba(0, 0, 0, .3)'
}

const inputStyle = {
  padding: '8px',
  width: '100%',
  display: 'block',
  marginBottom: '10px',
  boxSizing: 'border-box',
  outline: 'none'
}

const messageStyle = {
  fontSize: '12px',
  height: '12px',
  marginBottom: '10px'
}

const buttonStyle = {
  padding: '8px 15px'
}

const regUsername = /[a-zA-Z].{2,15}$/;
const regPassword = /[a-zA-Z0-9!@#$%^*()\-_=+\\|[\]{};:'",.<>/?].{5,}$/;

const isSafe = (string, type) => {
  // string: str!
  // type: oneOf( 'username' | 'password' )!
  if ( type === 'username' ) {
    if ( string && regUsername.test(string)) return true;
    else return false;

  } else if ( type === 'password' ) {
    if ( string && regPassword.test(string)) return true;
    else return false;

  } else return false;
}


class App extends Component {
  state = {
    usename: '',
    password: '',
    message: { type: '', text: '' },
  }

  usernameRef = createRef();
  passwordRef = createRef();

  onChange = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  onSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;

    const usernameElement = this.usernameRef.current;
    const passwordElement = this.passwordRef.current;

    if ( !isSafe( username, 'username' )) {
      this.setState({
        message: { type: 'error', text: 'Username is wrong' } 
      });
      usernameElement.focus();

    } else if ( !isSafe( password, 'password' ) ) {
      this.setState({
        message: { type: 'error', text: 'Password is wrong' },
        password: ''
      })
      passwordElement.focus();

    } else {
      this.setState({
        message: { type: 'success', text: `Login success! welcome ${username}` },
        username: '',
        password: ''
      });
      usernameElement.focus();
    }
  }

  render() {
    const { username, password, message } = this.state;

    return (
      <form onSubmit={this.onSubmit} style={formStyle} >

        <input
          ref={this.usernameRef}
          name='username'
          value={username}
          style={inputStyle}
          placeholder='Please enter 3-15 characters and only alpha numeric.'
          onChange={this.onChange}
          autoComplete='off'
        />

        <input
          ref={this.passwordRef}
          name='password'
          type='password'
          value={password}
          style={inputStyle}
          placeholder='Please enter 6 more characters'
          onChange={this.onChange}
          autoComplete='off'
        />

        <div style={{ ...messageStyle, color: message.type === 'error' ? 'red' : 'green' }}>{message.text}</div>

        <button disabled={ !isSafe(username, 'username') || !isSafe(password, 'password') } type='submit' style={buttonStyle} >
          Log in
        </button>
        
      </form>

    )
  }
}

export default App;
