import { routeActions } from 'react-router-redux';

export const LOAD_WISHLIST_REQUEST = 'LOAD_WISHLIST_REQUEST';
export const LOAD_WISHLIST_SUCCESS = 'LOAD_WISHLIST_SUCCESS';

export const loadWishlist = (userData) => {
  return dispatch => {
    dispatch(loadWishlistRequest());			// presents spinner

    // NEED TO SEND TOKEN 

    return fetch('http://localhost:8080/wishlist?username='+userData.username, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        'x-access-token': localStorage.token
        // ADD TOKEN LANGUAGE HERE

      }
    })
    .then(response => {
      // return pairBeersWithLabels(response.json());     //   only need to grab image if presenting
      return response.json();
    })
    .then(response => {
      console.log('resp in wishlist: ', response);
      dispatch(loadWishlistSuccess(response));
    })
    .catch(err => console.error('Error in loadWishlist:', err));
  }
}

const loadWishlistRequest = () => {
	return {
    	type: LOAD_WISHLIST_REQUEST
  	}
}

const loadWishlistSuccess = (wishlistData) => {
	return {
    	type: LOAD_WISHLIST_SUCCESS,
    	wishlistData
  	}
}

