import rootReducer from './../../src/reducers/index';
import getTreeDataReducer from './../../src/reducers/getTreeData';
import { createStore } from 'redux';
import constants from './../../src/constants';
import * as actions from './../../src/actions';

let store = createStore(rootReducer);
const { initialState, types } = constants;


describe("rootReducer", () => {

  test('Should return default state if no action type is recognized', () => {
    expect(rootReducer({}, { type: null })).toEqual({
      treeData: {},
      currentCoords: {}
    });
  });

  test('Should contain getTreeDataReducer logic', () => {
    expect(store.getState().treeData).toEqual(getTreeDataReducer(undefined, { type: null }));
  });

  test('Should return deault state if no action type is recognized', () => {
    expect(store.getState().currentCoords).toEqual(getCoordsReducer(undefined, { type: null }));
  });

});

describe('getTreeDataReducer', () => {
  it('Should updated state when API data is requested', () => {
    const action = actions.requestTreeData();
    const newStateEntry = {
      treeData: action.treeData
    };
    expect(getTreeDataReducer(initialState.treeData, action)).toEqual(newStateEntry);
  });

  it('Should filter tree data based on location', () => {
    const action = actions.filterData();
    const newStateEntry = {
      treeData: action.filteredTreeData
    };
    expect(getTreeDataReducer(initialState.treeData, action)).toEqual(newStateEntry);
  });
});

describe('getCoordsReducer', () => {
  it('Should update state when API data is requested', () => {
    const testCoords = {
      lat: 45.520852,
      lng: -122.677377
    }

    const action = actions.requestCoords(testCoords);
    console.log(action);
    const newStateEntry = {
      lat: action.lat,
      lng: action.lng
    };
    expect(getCoordsReducer(initialState.currentCoords, action)).toEqual(newStateEntry);
  });
});
