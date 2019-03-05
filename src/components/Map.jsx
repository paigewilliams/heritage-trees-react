import React from 'react';
import MapContainer from './MapContainer';
import { connect } from 'react-redux'

function Map(props){
  console.log(props)
  let renderedContent;
  if(props.treeData[0].length){
    console.log('in map')
    renderedContent = <MapContainer treeData={props.treeData}/>
  }
  return(
    <div>
      <h1>Map works</h1>
      {renderedContent}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    treeData: state.masterTreeData
  }
}

export default connect(mapStateToProps)(Map);
