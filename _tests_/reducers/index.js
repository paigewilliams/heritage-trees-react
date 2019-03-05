import getTreeData from './../../src/reducers/root-reducer'

describe('getTreeDataReducer', () => {
  it('Should updated state when API data is requested', () => {
    const action = actions.requestTreeData();
    const new StateEntry = {
      isFetching: true,
      treeData: action.treeData
    };
    expect(getTreeDataReducer(initialState.treeData, action)).toEqual(newStateEntry);
  });
})
