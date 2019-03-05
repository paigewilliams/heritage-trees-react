export const requestTreeData = () => ({
  type: types.REQUEST_DATA
});


export function fetchTreeData(){
  return function(dispatch) {
    handleApiRequest();
    dispatch(requestTreeData());
  }
}


handleApiRequest(){
  const url = `https://opendata.arcgis.com/datasets/fd1d618ac3174ad5be730524a4dd778e_26.geojson`;
  fetch(url)
  .then((response) => response.json(),
    error => console.log('An error occurred', error))
  .then((json) => {
    console.log(json.features)
    const newTreeData = json.features;
  });
  }
}
