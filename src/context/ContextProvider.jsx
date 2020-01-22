import React, { createContext, useReducer, useEffect, useMemo, useRef } from 'react';
import { findTreesWithinAMile } from '../utils';

const REQUEST_DATA_SUCCESS = 'REQUEST_DATA_SUCCESS';
const FILTER_DATA_SUCCESS = 'FILTER_DATA_SUCCESS';
const SELECTED_DATA = 'SELECTED_DATA';

export const fetchData = data => ({ type: REQUEST_DATA_SUCCESS, data });
export const filterData = data => ({ type: FILTER_DATA_SUCCESS, data });
export const selectData = data => ({ type: SELECTED_DATA, data });

const reducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_DATA_SUCCESS:
      return { ...state, treeData: action.data };
    case FILTER_DATA_SUCCESS:
      return { ...state, filteredTreeData: action.data };
    case SELECTED_DATA:
      return { ...state, selectedData: action.data }
    default:
      return state;
  }
};

const initialState = {
  treeData: [],
  filteredTreeData: [],
  selectedData: {}
}

const logger = dispatch => action => {
  console.groupCollapsed('type:', action.type);
  return dispatch(action);
}

const useReducerWithLogger = (...args) => {
  let prevState = useRef(initialState);
  const [state, dispatch] = useReducer(reducer, initialState);

  const dispatchWithLogger = useMemo(() => logger(dispatch), [dispatch]);

  useEffect(() => {
    if (state !== initialState) {
      console.log("Previous state: ", prevState.current);
      console.log("Next State: ", state);
      console.groupEnd();
    }
    prevState.current = state;
  }, [state]);
  return [state, dispatchWithLogger];
}

const fetchTreeData = async dispatch => {
  try {
    const response = await fetch('https://opendata.arcgis.com/datasets/fd1d618ac3174ad5be730524a4dd778e_26.geojson');
    const json = await response.json();
    const data = json.features;
    dispatch(fetchData(data));
  }
  catch (error) {
    console.log('An error occured', error);
  }
};

const fetchCoords = (dispatch, treeData) => {
  return async address => {
    try {
      const response = await fetch(
        'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?country=US&access_token=' + process.env.MAPBOX_API
      );
      const json = await response.json();
      const newCoords = json.features[0].center;
      const mile = 1.60934;
      const treesWithinAMile = findTreesWithinAMile(treeData, newCoords, mile);
      dispatch(filterData(treesWithinAMile));
    }
    catch (error) {
      console.log('An error occorred', error);
    }
  }
};

export const AppContext = createContext(initialState);

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducerWithLogger(reducer, initialState);

  useEffect(() => {
    fetchTreeData(dispatch);
  }, []);

  return (
    <AppContext.Provider
      value={{ state, dispatch, fetchCoords: fetchCoords(dispatch, state.treeData) }}
    >
      {children}
    </AppContext.Provider >
  );
};

export default AppContextProvider;