import React from 'react';
import MapContainer from './MapContainer';

function Map(props){

  return(
    <div>
      <h1>Map works</h1>
      <MapContainer treeData={props.treeData} />

    </div>
  )
}

export default Map;
