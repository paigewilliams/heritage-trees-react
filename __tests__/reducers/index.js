import rootReducer from './../../src/reducers/index';
import getTreeDataReducer from './../../src/reducers/getTreeData';
import getCoordsReducer from './../../src/reducers/getCoords';
import { createStore } from 'redux';
import * as actions from './../../src/actions';

let store = createStore(rootReducer);

describe("rootReducer", () => {

  test('Should return default state if no action type is recognized', () => {
    expect(rootReducer({}, {type: null})).toEqual({
      masterTreeData: {},
      currentCoords: {}
    });
  });

  test('Should contain getTreeDataReducer logic', () => {
    expect(store.getState().masterTreeData).toEqual(getTreeDataReducer(undefined, {type: null}));
  });

  test('Should return deault state if no action type is recognized', () => {
    expect(store.getState().currentCoords).toEqual(getCoordsReducer(undefined, {type: null}));
  });

});

describe('getTreeDataReducer', () => {
  it('Should updated state when API data is requested', () => {
    const action = actions.requestTreeData();
    const newStateEntry = {
      isFetching: true,
      treeData: action.treeData
    };
    expect(getTreeDataReducer(initialState.treeData, action)).toEqual(newStateEntry);
  });
});

describe('getCoordsReducer', () => {
  it('Should update state when API data is requested', () => {
    const action = actions.requestCoords();
    const newStateEntry = {
      isRecieved: true,
      coords: action.coords
    };
    expect(getCoordsReducer(initialState.coords, action)).toEqual(newStateEntry);
  });
})
