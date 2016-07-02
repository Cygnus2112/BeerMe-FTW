import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActions from '../actions/authActions';

import { Jumbotron } from 'react-bootstrap';

import Login from '../components/login'
import Signup from '../components/signup'
import Header from '../components/header'

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.displayApp = this.displayApp.bind(this);

  }

  componentDidMount() {
    const { checkForToken } = this.props.authActions;
    checkForToken();
  }

  displayApp() {
    return (
      <div>
        <Login {...this.props}/>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div><Header { ...this.props } /></div>
          <div>
            { this.displayApp() }
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
