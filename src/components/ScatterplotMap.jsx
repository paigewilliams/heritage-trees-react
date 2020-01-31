import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactMapGL from 'react-map-gl';
import DeckGL, { ScatterplotLayer } from 'deck.gl';
import { AppContext, selectData } from '../context/ContextProvider';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapContainerStyle = styled.div`
  width: 100%;
  height: 100%;
`;

const TooltipStyle = styled.div`
  position: absolute;
  z-index: 1;
  pointer-events: none;
  background: #D5D5D5;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  opacity: 0.9;
  p:nth-child(even){
    color: #333333;
  }
`;

const Title = styled.p`
  font-size: 0.75em;
  font-weight: bold;
  margin-bottom: -10px;
  padding: 0;
  letter-spacing: 0.1em;
  color: black;

`;

const width = '100%';
const height = '100%';
const RED = [255, 99, 71, 255];
const GREEN = [91, 150, 91];

const initalViewport = {
  latitude: 45.5122,
  longitude: -122.6587,
  zoom: 11,
  bearing: 0,
  pitch: 0,
  width: '100%',
  height: '70%'
};

const ScatterplotMap = ({ data }) => {
  const { dispatch, state } = useContext(AppContext);
  const { selectedData } = state;
  const [selectedId, setSelectedId] = useState(null);
  const [clickedTree, setClickedTree] = useState(null);

  useEffect(() => {
    if (selectedData.properties && selectedData.properties.OBJECTID !== selectedId) {
      setSelectedId(selectedData.properties.OBJECTID);
    }

  }, [selectedData]);

  const renderTooltip = () => {
    if (clickedTree) {
      return (
        <TooltipStyle style={{ left: clickedTree.x, top: clickedTree.y }}>
          <Title>SPECIES</Title>
          <p>{clickedTree.data.properties.COMMON}</p>
          <Title>ADDRESS</Title>
          <p>{clickedTree.data.properties.SITE_ADDRESS}</p>
          <Title>YEAR DESIGNATED</Title>
          <p>{clickedTree.data.properties.YEAR_Designated}</p>
        </TooltipStyle>
      );
    }
  };

  const renderLayers = () => {
    return ([
      new ScatterplotLayer({
        id: 'scatterplot-layer',
        data,
        pickable: true,
        opacity: 0.5,
        stroked: false,
        highlightColor: RED,
        filled: true,
        autoHighlight: true,
        radiusScale: 12,
        radiusMinPixels: 5,
        radiusMaxPixels: 20,
        lineWidthMinPixels: 1,
        getPosition: d => d.geometry.coordinates,
        getRadius: () => 6,
        getFillColor: d => d.properties.OBJECTID === selectedId ? RED : GREEN,
        getLineColor: () => [0, 0, 0],
        onHover: ({ object, x, y }) => {
          if (object && object.properties.OBJECTID !== selectedId) {
            dispatch(selectData(object));
            setSelectedId(object.properties.OBJECTID);
            setClickedTree({ data: object, x, y });
          } else if (!object) {
            dispatch(selectData({}));
            setSelectedId(null);
            setClickedTree(null);
          }
        },

        updateTriggers: {
          getFillColor: selectedId
        }
      })
    ]);
  };

  return (
    <MapContainerStyle>
      <DeckGL width={width} height={height} initialViewState={initalViewport} layers={renderLayers()} controller={true}>
        <ReactMapGL
          width={width}
          height={height}
          mapStyle='mapbox://styles/mapbox/light-v9'
          attributionControl={true}
          mapboxApiAccessToken={process.env.MAPBOX_API}
        >
          )}
        </ReactMapGL>
        {renderTooltip()}
      </DeckGL>
    </MapContainerStyle >

  );
};

ScatterplotMap.propTypes = {
  data: PropTypes.array,
};

export default ScatterplotMap;

