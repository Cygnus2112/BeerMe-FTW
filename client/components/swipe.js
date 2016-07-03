import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import * as beerActions from '../actions/beerActions';   

class Swipe extends React.Component {
  constructor(){
    super();

  }

  likeBeer = (e) => {
    // add to wishlist
    // show "added to wishlist" message

    const { loadFrontBeer } = this.props.beerActions;
    loadFrontBeer();

    if(this.props.beerData.length < 5){
      const { loadBeers } = this.props.beerActions;
      let userData = {
        username: this.props.username,
        style: this.props.styleChoice
      }
      loadBeers(userData);
    }

  }

  dislikeBeer = (e) => {
    // add to dislikes
    // show "nope" message
    // any other stuff

    const { loadFrontBeer } = this.props.beerActions;
    loadFrontBeer();

    if(this.props.beerData.length < 5){
      const { loadBeers } = this.props.beerActions;
      let userData = {
        username: this.props.username,
        style: this.props.styleChoice
      }
      loadBeers(userData);
    }
  }

  // preliminary attempt at Tinder-style Swipe. Currently does nothing

  drag = (e) => {
    e.dataTransfer.setData('text/html', null);
    if(e.pageX < 480){
      console.log("swiped left");
      
      console.log(e.nativeEvent);
    }    
  }

  render(){ 
    let beerView = this.props.isSearching && this.props.beerData.length === 0 ? (
      <div className='spinner'>
        <h3>Loading beers...</h3>
        <img src='../assets/darkspinner.gif'></img>
      </div> ) : (
      <div>
        <div draggable="true" onDrag={ this.drag } id="beer">
          <img className="beerlabel" src={this.props.beerToView.label} alt={this.props.beerToView.name} draggable='false'></img>
          <br />
          <br />
          <h2>{this.props.beerToView.name}</h2></div>  
          <br />
          <div>
          <span><img src='../assets/ic_thumb_up_green_3x.png' alt='Like' onClick={ this.likeBeer }></img></span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span><img src='../assets/ic_thumb_down_red_3x.png' alt='Dislike' onClick={ this.dislikeBeer }></img></span>
        </div>
      </div>
      );

    return(
      <Modal
        show={this.props.showSwipeModal}
        onHide={this.props.closeSwipe}              // DO API CALL TO UPDATE WISHLIST/DISLIKES HERE
        className='beermodal'>
          <Modal.Header closeButton className='close-btn'>
          </Modal.Header>
          <Modal.Body className='modalbody'>
            { beerView }
          </Modal.Body>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    beerToView: state.beerReducer.beerToView,
    beerData: state.beerReducer.beerData,
    isSearching: state.beerReducer.isSearching
  }
}

export default connect(mapStateToProps)(Swipe);