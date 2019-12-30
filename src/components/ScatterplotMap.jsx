import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import MapGL, { Popup } from 'react-map-gl';
import DeckGL, { ScatterplotLayer } from 'deck.gl';
import { AppContext, selectData } from '../context/ContextProvider';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapContainerStyle = styled.div`
  width: 100%;
  height: 25rem;
  padding-right: 2rem;
  display: flex
`;

const MALE_COLOR = [255, 99, 71];
const FEMALE_COLOR = [91, 150, 91];

const initalViewport = {
  latitude: 45.5122,
  longitude: -122.6587,
  zoom: 11,
  bearing: 0,
  pitch: 0,
  width: '100%',
  height: '70%'
};

const ScatterplotMap = ({ viewport, data }) => {

  const { dispatch, state } = useContext(AppContext);
  const { selectedData } = state;
  const [selectedId, setSelectedId] = useState(null);
  const [clickedFeature, setClickedFeature] = useState(null);

  useEffect(() => {
    if (selectedData.properties) {
      setSelectedId(selectedData.properties.OBJECTID);
    }
  }, [selectedData]);

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

  function renderLayers() {

    return ([
      new ScatterplotLayer({
        id: 'scatterplot-layer',
        data,
        pickable: true,
        opacity: 0.5,
        stroked: false,
        filled: true,
        radiusScale: 10,
        radiusMinPixels: 1,
        radiusMaxPixels: 100,
        lineWidthMinPixels: 1,
        getPosition: d => d.geometry.coordinates,
        getRadius: () => 6,
        getFillColor: d => d.properties && d.properties.OBJECTID === selectedId ? MALE_COLOR : FEMALE_COLOR,
        getLineColor: () => [0, 0, 0],
        onClick: ({ object }) => {
          console.log('in on click');
          setClickedFeature({ fetaure: object });
          console.log('clickedFeature', clickedFeature);
        },
        onHover: ({ object }) => {
          object && object !== selectedData && dispatch(selectData(object));
        },
        updateTriggers: {
          getFillColor: [selectedId]
        }
      })
    ]);
  }

  const width = '100%';
  const height = '70%';

  return (
    <MapContainerStyle>
      <DeckGL width={width} height={height} {...viewport} initialViewState={initalViewport} layers={renderLayers()} controller={true}>
        <MapGL
          width='100%'
          height='70%'
          mapStyle='mapbox://styles/mapbox/light-v9'
          mapboxApiAccessToken={process.env.MAPBOX_API}
        >
          {renderPopUp()}
        </MapGL>
      </DeckGL>

    </MapContainerStyle>

  );
};

export default ScatterplotMap;

