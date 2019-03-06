import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { connect } from 'react-redux';

const style = {
  width: '500px',
  height: '500px',
  position: 'relative'
};

export class MapContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  onMarkerClick(props, marker, e){
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });}


  render(){
    return (
      <Map
        google={this.props.google}
        style={style}
        initialCenter={{
          lat: 45.5122,
          lng: -122.6587
        }}
        zoom={12}>
        {Object.keys(this.props.treeData).map((treeId) => {

          let marker = this.props.treeData[treeId];
          return <Marker title={marker.properties.COMMON}
            position={{lat: marker.properties.LAT, lng: marker.properties.LON}}
            address={marker.properties.SITE_ADDRESS}
            year={marker.properties.YEAR_Designated}
            onClick={this.onMarkerClick}
            key={treeId} />
        }
        )}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <h3>{this.state.selectedPlace.title}</h3>
            <p><strong>Address:</strong> {this.state.selectedPlace.address}</p>
            <p><strong>Year designated:</strong> {this.state.selectedPlace.year}</p>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: (process.env.GOOGLE_MAPS_API)
})(MapContainer);
