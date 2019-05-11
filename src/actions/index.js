import * as types from './../constants/ActionTypes';

export const requestTreeData = (treeData) => ({
  type: types.REQUEST_DATA,
  treeData: treeData
});

export const filterData = (filteredTreeData) => ({
  type: types.FILTER_DATA,
  filteredTreeData: filteredTreeData
});

export const fetchTreeData = () => dispatch => {
  return fetch('https://opendata.arcgis.com/datasets/fd1d618ac3174ad5be730524a4dd778e_26.geojson')
    .then(
      response => response.json(),
      /* eslint-disable no-console */
      error => console.log('An error occured', error)
      /* eslint-enable no-console */
    ).then(
      json => {
        const newTreeData = json.features;
        dispatch(requestTreeData(newTreeData));
      }
    );
};

export const fetchCoords = (address, treeData) => dispatch => {
  return fetch(
    /* eslint-disable no-undef */
    'https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key='+process.env.GOOGLE_MAPS_API
    /* eslint-enable no-undef */
  ).then(
    response => response.json(),
    /* eslint-disable no-console */
    error => console.log('An error occorred', error)
    /* eslint-enable no-console */
  ).then(
    json => {
      const newCoords = json.results[0].geometry.location;
      const mile = 1.60934;
      dispatch(filterData(findTreesWithinAMile(treeData, newCoords, mile)));
    });
};

const findTreesWithinAMile = (treeData, currentCoords, mile) => {
  return Object.keys(treeData).reduce((all, treeId) => {
    const tree = treeData[treeId];
    const treeCoords = { lat: tree.geometry.coordinates[1], lng: tree.geometry.coordinates[0] };
    mathForTreesWithinAMile(treeCoords, currentCoords, mile) ? all[treeId] = tree : null;
    return all;
  }, {});
};

const mathForTreesWithinAMile = (checkTree, centerPoint, mile) => {
  const ky = 40000 / 360;
  const kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
  const dx = Math.abs(centerPoint.lng - checkTree.lng) * kx;
  const dy = Math.abs(centerPoint.lat - checkTree.lat) * ky;
  return Math.sqrt(dx * dx + dy * dy) <= mile;
};
