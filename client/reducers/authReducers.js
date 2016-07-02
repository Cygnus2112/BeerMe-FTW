import * as ActionTypes from '../actions/authActions';

const initialState = {
  isFetching: false,
  isLoggedIn: false,
  username: '',
  wishlist: [],
  dislikes: [],
  authErrorMsg: '',
}

export default function authReducer(state = initialState, action){
  switch(action.type){
    case ActionTypes.SIGNUP_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isLoggedIn: false,
      })
    case ActionTypes.SIGNUP_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        isLoggedIn: false,
        authErrorMsg: action.err
      })
    case ActionTypes.SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isLoggedIn: true,
        username: action.info.username,
        wishlist: action.info.wishlist,
        dislikes: action.info.dislikes,
        authErrorMsg: '',                       // ADD WISHLIST AND DISLIKES
      })  
    case ActionTypes.LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isLoggedIn: false,
      })
    case ActionTypes.LOGIN_ERROR_PW:
      return Object.assign({}, state, {
        isFetching: false,
        isLoggedIn: false,
        authErrorMsg: action.err
      })
    case ActionTypes.LOGIN_ERROR_USER:
      return Object.assign({}, state, {
        isFetching: false,
        isLoggedIn: false,
        authErrorMsg: action.err
      })
    case ActionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isLoggedIn: true,
        username: action.user.username            // ADD WISHLIST AND DISLIKES
      })
    case ActionTypes.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isLoggedIn: false,
        username: '',
      })
    case ActionTypes.AUTH_REQUEST:
      return state;
      // return Object.assign({}, state, {
      //   isLoggedIn: false,
      //   username: '',
      // })
    case ActionTypes.AUTH_SUCCESS:
      return Object.assign({}, state, {
        isLoggedIn: true
      })
    default:
      return state;
  }
}