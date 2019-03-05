import * as types from './../constants/ActionTypes';

export const requestTreeData = (treeData) => ({
  type: types.REQUEST_DATA,
  treeData: treeData
});


export function fetchTreeData(){
  return function(dispatch) {
    return fetch('https://opendata.arcgis.com/datasets/fd1d618ac3174ad5be730524a4dd778e_26.geojson').then((response) => response.json(),
      error => console.log('An error occurred', error))
      .then((json) => {
        const newTreeData = json.features;
        dispatch(requestTreeData(newTreeData))
      });
  };
}
