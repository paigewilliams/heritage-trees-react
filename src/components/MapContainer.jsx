import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MapGL, { Source, Layer, Popup } from 'react-map-gl';
import { AppContext, selectData } from '../context/ContextProvider';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapContainerStyle = styled.div`
  width: 100%;
  height: 25rem;
  padding-right: 2rem;
  display: flex
`;

const dataLayer = {
  id: 'data',
  type: 'circle',
  paint: {
    'circle-radius': {
      'base': 1.5,
      'stops': [[12, 2], [22, 180]]
    },
    'circle-color': '#5B965B',
    'circle-opacity': 0.6
  },
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
  const [clickedFeature, setClickedFeature] = useState(null);
  const { dispatch } = useContext(AppContext);
  const onMapUpdate = (treeData) => {
    return setDataForMap({ type: 'FeatureCollection', features: treeData });
  };

  const onViewportChange = viewport => setViewport({ ...viewport });

  const renderPopUp = () => {

    return (
      clickedFeature && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={clickedFeature.feature.properties.LON}
          latitude={clickedFeature.feature.properties.LAT}
          closeOnClick={true}
          onClose={() => setClickedFeature(null)}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h4>Common Name: {`${clickedFeature.feature.properties.COMMON}`}</h4>
            <p>Scientific name: {`${clickedFeature.feature.properties.SCIENTIFIC}`}</p>
            <p>Height: {`${clickedFeature.feature.properties.HEIGHT}`}ft</p>
            <p>Circumference: {`${clickedFeature.feature.properties.CIRCUMF}`}in</p>
          </div>
        </Popup>
      )
    );
  };

  // eslint-disable-next-line react/no-multi-comp
  const renderTreeData = () =>
    (<Source type="geojson" data={dataForMap}>
      <Layer {...dataLayer} />
    </Source>);

  const onClick = (event) => {
    const {
      features,
      srcEvent: { offsetX, offsetY }
    } = event;
    const clickedFeature = features && features.find(f => f.layer.id === 'data');
    clickedFeature && setClickedFeature({ feature: clickedFeature, x: offsetX, y: offsetY });
    clickedFeature && dispatch(selectData(clickedFeature.properties));
  };

  const onHover = (e) => {
    // console.log('e', e);
  };

  return (
    <MapContainerStyle>
      <MapGL
        {...viewport}
        width='100%'
        height='100%'
        mapStyle='mapbox://styles/mapbox/light-v9'
        mapboxApiAccessToken={process.env.MAPBOX_API}
        onViewportChange={onViewportChange}
        onClick={onClick}
        onHover={onHover}
      >
        {treeData && renderTreeData()}
        {renderPopUp()}
      </MapGL>
    </MapContainerStyle>
  );
};

MapContainer.propTypes = {
  treeData: PropTypes.array
};

export default MapContainer;