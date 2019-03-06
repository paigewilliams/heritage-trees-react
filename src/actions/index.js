import * as types from './../constants/ActionTypes';

export const requestTreeData = (treeData) => ({
  type: types.REQUEST_DATA,
  treeData: treeData
});

export const requestCoords = (coords) => ({
  type: types.GET_COORDS,
  coords: coords
})


export function fetchTreeData(){
  return function(dispatch) {
    return fetch('https://opendata.arcgis.com/datasets/fd1d618ac3174ad5be730524a4dd778e_26.geojson').then((response) => response.json(),
      error => console.log('An error occurred', error))
      .then((json) => {
        const newTreeData = json.features;
        dispatch(requestTreeData(newTreeData));
      });
  };
}

export function fetchCoords(address){
  return function(dispatch){
    return fetch('https://maps.googleapis.com/maps/api/geocode/json?address' + address + '&key=process.env.GOOGLE_MAPS_API').then((response) => response.json(),
    error => console.log('An error occorred', error))
    .then((json) => {
      const newCoords = json.geometry.location;
      dispatch(requestCoords(newCoords));
    });
  };
}
