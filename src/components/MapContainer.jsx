import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import styled from 'styled-components';
// import mapboxgl from 'mapbox-gl';
import MapGL from 'react-map-gl';
// import v4 from 'uuid/v4';
import 'mapbox-gl/dist/mapbox-gl.css';

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
  }

  // componentDidMount() {
  //   const { lat, lng, zoom } = this.state;
  //   this.map = new mapboxgl.Map({
  //     container: this.mapContainer,
  //     style: 'mapbox://styles/mapbox/light-v9',
  //     center: [lng, lat],
  //     zoom
  //   });
  //   this.map.on('move', () => {
  //     const { lng, lat } = this.map.getCenter();
  //     this.setState({
  //       lng: lng.toFixed(4),
  //       lat: lat.toFixed(4),
  //       zoom: this.map.getZoom().toFixed(2)
  //     });
  //   });
  // }

  // componentDidUpdate() {
  //   console.log(this.props.treeData);
  //   Object.keys(this.props.treeData).map(treeId => {
  //     let tree = this.props.treeData[treeId]
  //     this.map.addLayer({
  //       'id': v4(),
  //       'type': 'circle',
  //       'source': {
  //         'type': 'geojson',
  //         'data': {
  //           'type': 'Feature',
  //           'properties': {
  //             'address': tree.properties.SITE_ADDRESS,
  //           },
  //           'geometry': {
  //             'type': 'Point',
  //             'coordinates': tree.geometry.coordinates,
  //           }
  //         }
  //       }
  //     });
  //   })
  // }

  render() {
    const { viewport } = this.state;
    return (
      <MapContainerStyle>
        <MapGL
          {...viewport}
          mapStyle='mapbox://styles/mapbox/light-v9'
          mapboxApiAccessToken={TOKEN}
          onViewportChange={(viewport) => this.setState({ viewport })}>
        </MapGL>
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
