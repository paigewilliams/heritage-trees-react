import React from 'react';
import MarkerData from './MarkerData';
import { Marker } from 'google-maps-react';

class ApiControl extends React.Component {

  constructor(props){
    super(props)
    this.state ={
      treeData: []
    }
    this.handleApiRequest = this.handleApiRequest.bind(this);
  }

  handleApiRequest(){
    const url = `https://opendata.arcgis.com/datasets/fd1d618ac3174ad5be730524a4dd778e_26.geojson`;
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        treeData: data.features
      })
    })
  }

  componentDidMount(){
    this.handleApiRequest();
  }

  render(){
    return (
        {this.state.treeData.map((marker) =>
          <Marker title={marker.properties.COMMON}
            position={{lat: marker.geometry.coordinates[1], lng: marker.geometry.coordinates[0]}}
             />
        )}

    )
  }

}

export default ApiControl;
