import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MapGL from 'react-map-gl';
import DeckGL, { ScatterplotLayer } from 'deck.gl';
import { AppContext, selectData } from '../context/ContextProvider';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapContainerStyle = styled.div`
  width: 100%;
  height: 100%;
`;

const RED = [255, 99, 71];
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
  const [clickedFeature, setClickedFeature] = useState(null);

  useEffect(() => {
    if (selectedData.properties && selectedData.properties.OBJECTID !== selectedId) {
      setSelectedId(selectedData.properties.OBJECTID);
    }

  }, [selectedData]);

  const renderPopUp = () => {
    console.log('renderPopup', clickedFeature);
    // return (
    //   clickedFeature && (
    //     <Popup
    //       tipSize={5}
    //       anchor="top"
    //       longitude={clickedFeature.feature.properties.LON}
    //       latitude={clickedFeature.feature.properties.LAT}
    //       closeOnClick={true}
    //     // onClose={() => setClickedFeature(null)}
    //     >
    //       <div style={{ display: 'flex', flexDirection: 'column' }}>
    //         <h4>Common Name: {`${clickedFeature.feature.properties.COMMON}`}</h4>
    //         <p>Scientific name: {`${clickedFeature.feature.properties.SCIENTIFIC}`}</p>
    //         <p>Height: {`${clickedFeature.feature.properties.HEIGHT}`}ft</p>
    //         <p>Circumference: {`${clickedFeature.feature.properties.CIRCUMF}`}in</p>
    //       </div>
    //     </Popup>
    //   )
    // );
  };

  const renderLayers = () => {
    return ([
      new ScatterplotLayer({
        id: 'scatterplot-layer',
        data,
        pickable: true,
        opacity: 0.5,
        stroked: false,
        filled: true,
        radiusScale: 12,
        radiusMinPixels: 3,
        radiusMaxPixels: 25,
        lineWidthMinPixels: 1,
        getPosition: d => d.geometry.coordinates,
        getRadius: () => 6,
        getFillColor: d => d.properties && d.properties.OBJECTID === selectedId ? RED : GREEN,
        getLineColor: () => [0, 0, 0],
        onClick: ({ object }) => {
          setClickedFeature({ fetaure: object });
        },
        onHover: ({ object }) => {
          if (object && object.properties.OBJECTID !== selectedId) {
            dispatch(selectData(object));
            setSelectedId(object.properties.OBJECTID);
          } else if (!object) {
            dispatch(selectData({}));
            setSelectedId(null);
          }

        },
        updateTriggers: {
          getFillColor: selectedId
        }
      })
    ]);
  };

  const width = '100%';
  const height = '100%';

  return (
    <MapContainerStyle>
      <DeckGL width={width} height={height} initialViewState={initalViewport} layers={renderLayers()} controller={true}>
        <MapGL
          width='100%'
          height='70%'
          mapStyle='mapbox://styles/mapbox/light-v9'
          // eslint-disable-next-line no-undef
          mapboxApiAccessToken={process.env.MAPBOX_API}
        >
          {renderPopUp()}
        </MapGL>
      </DeckGL>
    </MapContainerStyle>

  );
};

ScatterplotMap.propTypes = {
  data: PropTypes.array,
};

export default ScatterplotMap;

