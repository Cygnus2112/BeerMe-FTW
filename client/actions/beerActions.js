export const LOAD_BEERS_REQUEST = 'LOAD_BEERS_REQUEST';
export const LOAD_BEERS_SUCCESS = 'LOAD_BEERS_SUCCESS';
export const LOAD_FRONT_BEER = 'LOAD_FRONT_BEER';
export const CLEAR_BEER_DATA = 'CLEAR_BEER_DATA';
export const CLEAR_FRONT_BEER = 'CLEAR_FRONT_BEER';

export const loadBeers = (userData) => {
  return dispatch => {
    dispatch(loadBeersRequest());

    return fetch('http://localhost:8080/fetchbeers?username='+userData.username+"&style="+userData.style, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('beerme-token')
      }
    })
    .then(response => {
      return response.json();
    })
    .then(response => {
      let beerArr = [];
      for(var key in response){
        beerArr.push({
          id: key,
          name: response[key].name,
          label: response[key].label,
          style: response[key].style
        })
      }
      dispatch(loadBeersSuccess(beerArr));             
    })
    .catch(err => console.error('Error in loadBeers:', err));
  }
}

const loadBeersRequest = () => {
  return {
    type: LOAD_BEERS_REQUEST
  }
}

const loadBeersSuccess = (beerData) => {
  return {
    type: LOAD_BEERS_SUCCESS,
    beerData
  }
}

const loadFrontBeerSuccess = () => {
  return {
    type: LOAD_FRONT_BEER
  }
}

export const loadFrontBeer = () => {
  return dispatch => {
    dispatch(loadFrontBeerSuccess())
  }
}

const clearBeerDataSuccess = () => {
  return {
    type: CLEAR_BEER_DATA
  }
}

export const clearBeerData = () => {
  return dispatch => {
    dispatch(clearBeerDataSuccess())
  }
}

const clearFrontBeerSuccess = () => {
  return {
    type: CLEAR_FRONT_BEER
  }
}

export const clearFrontBeer = () => {
  return dispatch => {
    dispatch(clearFrontBeerSuccess())
  }
}

