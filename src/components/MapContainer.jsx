import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MapGL, { Marker } from 'react-map-gl';
import v4 from 'uuid/v4';
import 'mapbox-gl/dist/mapbox-gl.css';
import Pin from './Pin';

const MapContainerStyle = styled.div`
  width: 100rem;
  height: 30rem;
  padding-right: 2rem;
  display: flex
`;

const MapContainer = ({ treeData }) => {
  const [viewport, setViewport] = useState({
    latitude: 45.5122,
    longitude: -122.6587,
    zoom: 10,
    bearing: 0,
    pitch: 0,
    width: '100%',
    height: 500
  });

  const onViewportChange = viewport => setViewport({ ...viewport });

  const displayTreeData = (tree) => (
    <Marker key={v4()} latitude={tree.geometry.coordinates[1]} longitude={tree.geometry.coordinates[0]}>
      <Pin size={20} />
    </Marker>
  );

  return (
    <MapContainerStyle>
      <MapGL
        {...viewport}
        width='100%'
        height='100%'
        mapStyle='mapbox://styles/mapbox/light-v9'
        mapboxApiAccessToken={process.env.MAPBOX_API}
        onViewportChange={onViewportChange}>
        {treeData && (
          Object.keys(treeData).map(treeId => {
            const tree = treeData[treeId];
            return displayTreeData(tree);
          })
        )}
      </MapGL>
    </MapContainerStyle>
  );
};

MapContainer.propTypes = {
  treeData: PropTypes.object
};

export default MapContainer;