import * as types from './../constants/ActionTypes';

export default( state = {}, action) => {
  let newCoords;
  let newCoordsStateSlice;
  switch (action.type){
    case types.GET_COORDS:
      newCoords = {
        lat: action.lat,
        lng: action.lng
      }
      newCoordsStateSlice = Object.assign({}, state, newCoords);
      return newCoordsStateSlice;
    default:
      return state;
  }
};
