import rootReducer from './../../src/reducers/index';
import getTreeDataReducer from './../../src/reducers/getTreeData';
import { createStore } from 'redux';

let store = createStore(rootReducer);

describe("rootReducer", () => {

  test('Should return default state if no action type is recognized', () => {
    expect(rootReducer({}, {type: null})).toEqual({
      masterTreeData: {}
    });
  });

  test('Should contain getTreeDataReducer logic', () => {
    expect(store.getState().masterTreeData).toEqual(getTreeDataReducer(undefined, {type: null}));
  });

});
