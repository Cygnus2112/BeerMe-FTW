import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActions from '../actions/authActions';

//import Header from '../components/header'
import Footer from '../components/footer'


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.displayApp = this.displayApp.bind(this);
  }

  // <div><Header { ...this.props } /></div>

  displayApp() {
    return (
      <div className="container">
        <div>{this.props.children}</div>
        <div><Footer { ...this.props } /></div>
     </div>
    )
  }

  render() {
    return (
      <div>
        { this.displayApp() }
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);