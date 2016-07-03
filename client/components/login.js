import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router';

class Login extends React.Component {

  constructor(){
    super();
    this.submitLogin = this.submitLogin.bind(this);
 
  }

  submitLogin(e){
    e.preventDefault();
    const { login } = this.props.authActions;
    const username = this.refs.username;
    const password = this.refs.password;
    const userInfo = {
      username: username.value,
      password: password.value
    };

    login(userInfo)

    username.value = '';
    password.value = '';
  }

  displayError(){
    if(this.props.authErrorMsg){
      return(
        <span className='login-error form-error'>
          Username and/or password is incorrect.
        </span>
      )
    } else {
      return null;
    }
  }

  render(){
    return(
      <div>
      <Jumbotron className='jumbo'>
          <br />
          <form className='form-main'>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Username'
                ref='username'
                className='form-control form-group-item' />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='form-control form-group-item'
                placeholder="Password"
                ref='password' />
            </div>
            {this.displayError()}
            <div className='form-group'>
              <button
                type='submit'
                className='btn btn-block submit form-group-item'
                onClick={this.submitLogin}>
                Sign in
              </button>
            </div>
            <div className='toggle'>
              {"Don't"} have an account? <br /><Link to="/signup">Click here to sign up.</Link>
            </div>
          </form>
      </Jumbotron>
      </div>
    )
  }

}

export default Login;