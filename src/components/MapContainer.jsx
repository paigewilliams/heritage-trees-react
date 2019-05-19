import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import styled from 'styled-components';
// import mapboxgl from 'mapbox-gl';
import ReactMapGL, { Marker } from 'react-map-gl';
import v4 from 'uuid/v4';
import 'mapbox-gl/dist/mapbox-gl.css';
import Pin from './Pin';

const TOKEN = 'pk.eyJ1IjoicGFpZ2V3aWxsaWFtcyIsImEiOiJjanNzNDlkc2QxcDg4NDRvMnllMTY5d3FhIn0.fdKpE8Pe2MuB4oe05YCvLw';

const MapContainerStyle = styled.div`
  width: 500px;
  height: 500px;
  position: absolute;
`;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 45.5122,
        longitude: -122.6587,
        zoom: 11,
        bearing: 0,
        pitch: 0,
        width: 500,
        height: 500,
      }
    };
    this.renderTreeData = this.renderTreeData.bind(this);
  }

  renderTreeData(tree) {
    return (
      <Marker key={v4()} latitude={tree.geometry.coordinates[1]} longitude={tree.geometry.coordinates[0]}>
        <Pin size={20} />
      </Marker>
    );
  }


  render() {
    const { viewport } = this.state;
    return (
      <MapContainerStyle>
        <ReactMapGL
          {...viewport}
          mapStyle='mapbox://styles/mapbox/light-v9'
          mapboxApiAccessToken={TOKEN}
          onViewportChange={(viewport) => this.setState({ viewport })}>
          {this.props.treeData && (
            Object.keys(this.props.treeData).map(treeId => {
              let tree = this.props.treeData[treeId];
              return this.renderTreeData(tree);
            })
          )}
        </ReactMapGL>
      </MapContainerStyle>
    );
  }
}

// class MapContainer extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       showingInfoWindow: false,
//       activeMarker: {},
//       selectedPlace: {}
//     };
//     this.onMarkerClick = this.onMarkerClick.bind(this);
//   }

//   onMarkerClick(props, marker) {
//     this.setState({
//       selectedPlace: props,
//       activeMarker: marker,
//       showingInfoWindow: true
//     });
//   }

//   render() {
//     return (
//       <Map
//         google={this.props.google}
//         style={style}
//         initialCenter={{
//           lat: 45.5122,
//           lng: -122.6587
//         }}
//         zoom={12}>
//         {Object.keys(this.props.treeData).map((treeId) => {
//           let marker = this.props.treeData[treeId];
//           return <Marker title={marker.properties.COMMON}
//             position={{ lat: marker.properties.LAT, lng: marker.properties.LON }}
//             address={marker.properties.SITE_ADDRESS}
//             year={marker.properties.YEAR_Designated}
//             onClick={this.onMarkerClick}
//             key={treeId} />;
//         }
//         )}
//         <InfoWindow
//           marker={this.state.activeMarker}
//           visible={this.state.showingInfoWindow}
//         >
//           <div>
//             <h3>{this.state.selectedPlace.title}</h3>
//             <p><strong>Address:</strong> {this.state.selectedPlace.address}</p>
//             <p><strong>Year designated:</strong> {this.state.selectedPlace.year}</p>
//           </div>
//         </InfoWindow>
//       </Map>
//     );
//   }
// }


Map.propTypes = {
  treeData: PropTypes.object
};

export default Map;

// export default GoogleApiWrapper({
//   /* eslint-disable no-undef */
//   apiKey: (process.env.GOOGLE_MAPS_API)
//   /* eslint-enable no-undef */
// })(MapContainer);
