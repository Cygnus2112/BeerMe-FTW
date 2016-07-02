import * as ActionTypes from '../actions/wishlistActions';

const initialState = {
  isFetching: false,
  wishlist: {},
  dislikes: {}
}

export default function beerReducer(state = initialState, action){
  switch(action.type){
    case ActionTypes.LOAD_WISHLIST_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case ActionTypes.LOAD_WISHLIST_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        beerData: action.beerData
      })
    default:
      return state;
  }
}