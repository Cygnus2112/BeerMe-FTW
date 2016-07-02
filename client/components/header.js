import React from 'react'
import * as authActions from '../actions/authActions';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);

    this.state = {
      logoutBtn: ""
    }
  }

  logoutUser() {
    const { logout } = this.props.authActions;
    logout();
  }

  componentDidMount() {
    const { checkForTokenHead } = this.props.authActions;
    checkForTokenHead();

    if(this.props.isLoggedIn) {
      this.setState({
        logoutBtn: (
      <div className="logout">
          <a href="#" onClick={ this.logoutUser }>Logout</a>
      </div>
      )
      })
    } else {
      this.setState({
        logoutBtn: (
      <div>
      </div>
      )
      })
    }
  }

  render() {
    return ( 
      <div className="header">
        <div>
          <img src="../assets/BeerMe-FTW-logo.png" className="logo" alt="BeerMe Logo"></img>
        </div>
        { this.state.logoutBtn }     
      </div>
   )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.authReducer.isLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);