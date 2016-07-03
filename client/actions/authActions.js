import { push } from 'react-router-redux';
import { browserHistory } from 'react-router'

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';

export const signup = (info) => {
  return dispatch => {
    dispatch(signupRequest(info));

      //return fetch('http://localhost:8080/signup', {
      return fetch("http://beermeserver.yxuemvb8nv.us-west-2.elasticbeanstalk.com/signup", {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: info.username,
        password: info.password,
        email: info.email
      })
    })
    .then(response => {
      return response.json();
    })
    .then(response => {
      try {
        if(response.token){
          localStorage.setItem('beerme-token', response.token);
          dispatch(signupSuccess(response));
  
          dispatch(browserHistory.push('/styles'))
        } else {
          dispatch(signupError(response));
        }
      } catch(e){
        dispatch(signupError(response.error));
      }
    })
    .catch(err => console.error('Error in signup:', err));
  }
}

const signupRequest = (info) => {
  return {
    type: SIGNUP_REQUEST,
    info
  }
}

const signupError = (err) => {
  return {
    type: SIGNUP_ERROR,
    err
  }
}

const signupSuccess = (info) => {
  return {
    type: SIGNUP_SUCCESS,
    info
  }
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_ERROR_PW = 'LOGIN_ERROR_PW';
export const LOGIN_ERROR_USER = 'LOGIN_ERROR_USER';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const login = (info) => {
  return dispatch => {
    dispatch(loginRequest(info));

    //return fetch('http://localhost:8080/login', {
    return fetch("http://beermeserver.yxuemvb8nv.us-west-2.elasticbeanstalk.com/login", {
      
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: info.username,
        password: info.password
      })
    })
    .then(response => {
      return response.json();
    })
    .then(response => {
      try {
        if(response.token){
          localStorage.setItem('beerme-token', response.token);

          dispatch(loginSuccess(response));
          dispatch(authSuccess());

          dispatch(browserHistory.push('/styles'))
        } else {
          if(response === 'InvalidPassword'){
            dispatch(loginErrorPassword(response));
          } else {
            dispatch(loginErrorUsername(response));
          }
        }
      } catch(e){
        dispatch(loginErrorPassword(response.error));
      }
    })
    .catch(err => console.error('login error:', err));
  }
}

const loginRequest = (info) => {
  return {
    type: LOGIN_REQUEST,
    info
  }
}

const loginErrorPassword = (err) => {
  return {
    type: LOGIN_ERROR_PW,
    err
  }
}

const loginErrorUsername = (err) => {
  return {
    type: LOGIN_ERROR_USER,
    err
  }
}

const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    user
  }
}

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const logout = () => {
  return dispatch => {
    localStorage.removeItem('beerme-token');
    dispatch(logoutSuccess());
    dispatch(browserHistory.push('/'))
  }
}

const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';

export const checkForToken = () => {
    return dispatch => {
      if(localStorage.getItem('beerme-token')){
        dispatch(authSuccess());

        dispatch(browserHistory.push('/styles'))
      }
    }
}

export const checkForTokenHead = () => {
    return dispatch => {
      if(localStorage.getItem('beerme-token')){
        dispatch(authSuccess());
      }
    }
}

const authRequest = () => {
  return {
    type: AUTH_REQUEST
  }
}

const authSuccess = () => {
  return {
    type: AUTH_SUCCESS
  }
}



