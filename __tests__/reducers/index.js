import rootReducer from './../../src/reducers/index';
import getTreeDataReducer from './../../src/reducers/getTreeData';
import filteredTreeDataReducer from '../../src/reducers/filterTreeData';
import { createStore } from 'redux';
import constants from './../../src/constants';
import * as actions from './../../src/actions';

let store = createStore(rootReducer);
const { initialState, types } = constants;


describe("rootReducer", () => {

  test('Should return default state if no action type is recognized', () => {
    expect(rootReducer({}, { type: null })).toEqual({
      treeData: {},
      filteredTreeData: {}
    });
  });

  test('Should contain getTreeDataReducer logic', () => {
    expect(store.getState().treeData).toEqual(getTreeDataReducer(undefined, { type: null }));
  });

  test('Should return deault state if no action type is recognized', () => {
    expect(store.getState().filteredTreeData).toEqual(filteredTreeDataReducer(undefined, { type: null }));
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

});


