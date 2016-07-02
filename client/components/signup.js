import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActions from '../actions/authActions';

import Header from '../components/header'

class Signup extends React.Component {
  constructor(){
    super();
    this.setPassword = this.setPassword.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.setEmail = this.setEmail.bind(this);

    this.submitSignup = this.submitSignup.bind(this);

    this.state = {
      password: '',
      username: '',
      email: '',
    }
  }

  setPassword(e){
    this.setState({
      password: e.target.value
    })
  }

  setUsername(e){
    this.setState({
      username: e.target.value
    })
  }

  setEmail(e){
    this.setState({
      email: e.target.value
    })
  }

  submitSignup(e){
    e.preventDefault();
      const { signup } = this.props.authActions;
      const username = this.refs.username;
      const password = this.refs.password;
      const email = this.refs.email;
      const userInfo = {
        username: username.value,
        password: password.value,
        email: email.value
      };

      signup(userInfo);

      username.value = '';
      password.value = '';
      email.value = '';
  }

  render(){
    let signupBox = this.props.isFetching ? (             
      <div className='register-spinner'>          
        <h3>Creating your account ... </h3>
        <img src='../assets/darkspinner.gif'></img>
      </div> ) : (
      <form>
        <div className='form-group username'>
          <input
            type='text'
            className='form-control form-group-item'
            placeholder='Username'
            ref='username'
            onChange={this.setUsername} />
        </div>
        <div className='form-group'>
          <input
            type='password'
            className='form-control form-group-item'
            placeholder='Password'
            ref='password'
            onChange={this.setPassword} />
        </div>
        <div className='form-group'>
          <input
            type='email'
            className='form-control form-group-item'
            placeholder='Email'
            ref='email'
            onChange={this.setEmail} />
        </div>
        <div className='form-group'>
          <button
            type='submit'
            className='btn btn-block submit form-group-item'
            onClick={this.submitSignup}><span>Create account</span>
          </button>
        </div>
        <div className='toggle'>
          Already have an account? <br /><Link to="/">Click here to login.</Link>
        </div>
      </form>
    );

    return(
      <div>
        <div><Header { ...this.props } /></div>
        <Jumbotron className='jumbo'>
          { signupBox }                                  
        </Jumbotron>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
    isFetching: state.authReducer.isFetching,
    authErrorMsg: state.authReducer.authErrorMsg,
    username: state.authReducer.username,
    wishlist: state.authReducer.wishlist,
    dislikes: state.authReducer.dislikes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup);