import * as types from './../constants/ActionTypes';

export const requestTreeData = (treeData) => ({
  type: types.REQUEST_DATA,
  treeData: treeData
});

export const requestCoords = ({ lat, lng }) => ({
  type: types.GET_COORDS,
  lat: lat,
  lng: lng
});

export const filterData = (filteredTreeData) => ({
  type: types.FILTER_DATA,
  filteredTreeData: filteredTreeData
});


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

export function fetchCoords(address, treeData){
  return function(dispatch){
    return fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key='+process.env.GOOGLE_MAPS_API).then((response) => response.json(),
      error => console.log('An error occorred', error))
      .then((json) => {
        const newCoords = json.results[0].geometry.location;
        const mile = 1.60934;
        dispatch(requestCoords(newCoords));
        let filteredTrees = findTreesWithinAMile(treeData, newCoords, mile);
        console.log(filteredTrees);
        dispatch(filterData(filteredTrees));
      });
  };
}

export function findTreesWithinAMile(treeData, currentCoords, mile) {

  return Object.keys(treeData).reduce((all, treeId) => {
    const tree = treeData[treeId];
    const treeCoords = { lat: tree.geometry.coordinates[1], lng: tree.geometry.coordinates[0] };
    if (mathForTreesWithinAMile(treeCoords, currentCoords, mile)) {
      all[treeId] = tree;
    }
    return all;
  }, {});
}

export function mathForTreesWithinAMile(checkTree, centerPoint, mile) {
  var ky = 40000 / 360;
  var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
  var dx = Math.abs(centerPoint.lng - checkTree.lng) * kx;
  var dy = Math.abs(centerPoint.lat - checkTree.lat) * ky;
  return Math.sqrt(dx * dx + dy * dy) <= mile;
}
