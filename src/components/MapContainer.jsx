import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MapGL, { Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapContainerStyle = styled.div`
  width: 100%;
  height: 30rem;
  padding-right: 2rem;
  display: flex
`;

const Tooltip = styled.div`
  margin: 8px;
  padding: 4px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  max-width: 300px;
  font-size: 10px;
  z-index: 9;
  pointer-events: none;
`;

const dataLayer = {
  id: 'data',
  type: 'circle',
  paint: {
    'circle-radius': {
      'base': 1.75,
      'stops': [[12, 2], [22, 180]]
    },
    'circle-color': 'orange',
  }
};

const initalViewport = {
  latitude: 45.5122,
  longitude: -122.6587,
  zoom: 10,
  bearing: 0,
  pitch: 0,
  width: '100%',
  height: 500
};


const MapContainer = ({ treeData }) => {
  useEffect(() => onMapUpdate(treeData), [treeData]);
  const [dataForMap, setDataForMap] = useState({ type: 'FeatureCollection', features: [] });
  const [viewport, setViewport] = useState(initalViewport);
  const [hoveredFeature, setHoveredFeature] = useState({ hoveredFeature: null, x: null, y: null });

  const onMapUpdate = (treeData) =>
    setDataForMap({ type: 'FeatureCollection', features: treeData });


  const onHover = e => {
    const { features, srcEvent: { offsetX, offsetY } } = e;
    const hoveredFeature = features && features.find(f => f.layer.id === 'data');
    setHoveredFeature({ hoveredFeature, x: offsetX, y: offsetY });
  };

  const renderTooltip = () => {
    const { x, y } = hoveredFeature;

    return (
      hoveredFeature && hoveredFeature.properties && (
        <Tooltip style={{ left: x, top: y }}>
          <div>Common name: {hoveredFeature.properties.COMMON}</div>
        </Tooltip>
      )
    );
  };

  const onViewportChange = viewport => setViewport({ ...viewport });

  // eslint-disable-next-line react/no-multi-comp
  const renderTreeData = () =>
    (<Source type="geojson" data={dataForMap}>
      <Layer {...dataLayer} />
    </Source>);

  return (
    <MapContainerStyle>
      <MapGL
        {...viewport}
        width='100%'
        height='100%'
        mapStyle='mapbox://styles/mapbox/light-v9'
        mapboxApiAccessToken={process.env.MAPBOX_API}
        onViewportChange={onViewportChange}
        onHover={onHover}>
        {treeData && renderTreeData()}
        {renderTooltip()}
      </MapGL>
    </MapContainerStyle>
  );
};

MapContainer.propTypes = {
  treeData: PropTypes.array
};

export default MapContainer;