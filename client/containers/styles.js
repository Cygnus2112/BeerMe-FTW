import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as authActions from '../actions/authActions';
import * as beerActions from '../actions/beerActions';

import Swipe from '../components/swipe'
import Header from '../components/header'

import { Jumbotron } from 'react-bootstrap';

class Styles extends React.Component {
  constructor() {
    super();

    this.fetchBeers = this.fetchBeers.bind(this);
    this.state = {
      showSwipeModal: false,
      styleChoice: ""
    }
  }

  fetchBeers = (style) => {         
    const { loadBeers } = this.props.beerActions;
    let userData = {
      username: this.props.username,
      style: style || this.props.styleChoice
    }
    loadBeers(userData);    
  }

  openSwipe = (e) => {
    const { clearFrontBeer } = this.props.beerActions;
    clearFrontBeer(); 

    let val = e.target.value || e.target.id;

    this.fetchBeers(val);      

    this.setState({
      showSwipeModal: true,
      styleChoice: val
    })
  }

  closeSwipe = () => {
    const { clearBeerData } = this.props.beerActions;
    clearBeerData();
    this.setState({
      showSwipeModal: false
    })
  }      

  displayStylesView() {
    return (
    <div>
      <Jumbotron className="jumbo">
              <h1>Choose a style</h1>
              <br></br>
                <a
                  href="#"
                  value="Ale"
                  onClick={this.openSwipe}><img src='../assets/Ale-125.png' alt='Ale' id='Ale'></img>
                  <Swipe    
                    {...this.props}
                    styleChoice={this.state.styleChoice}
                    showSwipeModal={ this.state.showSwipeModal }
                    closeSwipe={this.closeSwipe} />
                </a>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a
                  href="#"
                  value="Lager"
                  onClick={this.openSwipe}><img src='../assets/Lager-125.png' alt='Lager' id='Lager'></img>
                  <Swipe    
                    {...this.props}
                    styleChoice={this.state.styleChoice}
                    showSwipeModal={ this.state.showSwipeModal }
                    closeSwipe={this.closeSwipe} />
                </a>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a
                  href="#"
                  value="Pilsner"
                  onClick={this.openSwipe}><img src='../assets/Pilsner-125.png' alt='Pilsner' id='Pilsner'></img>
                  <Swipe    
                    {...this.props}
                    styleChoice={this.state.styleChoice}
                    showSwipeModal={ this.state.showSwipeModal }
                    closeSwipe={this.closeSwipe} />
                </a> 
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a
                  href="#"
                  value="Stout"
                  onClick={this.openSwipe}><img src='../assets/Stout-125.png' alt='Stout' id='Stout'></img>
                  <Swipe    
                    {...this.props}
                    styleChoice={this.state.styleChoice}
                    showSwipeModal={ this.state.showSwipeModal }
                    closeSwipe={this.closeSwipe} />
                </a>
                <br></br>
                <a href="#" value="Ale" onClick={this.openSwipe}>Ale</a>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="#" value="Lager" onClick={this.openSwipe}>Lager</a>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="#" value="Pilsner" onClick={this.openSwipe}>Pilsner</a>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="#" value="Stout" onClick={this.openSwipe}>Stout</a>
        </Jumbotron>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div><Header { ...this.props } /></div>
        <div>
          { this.displayStylesView() }
        </div>
      </div>
   )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
    isSearching: state.beerReducer.isSearching,
    beerData: state.beerReducer.beerData,
    beerToView: state.beerReducer.beerToView  
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    beerActions: bindActionCreators(beerActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Styles);

