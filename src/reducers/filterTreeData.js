import * as types from './../constants/ActionTypes';

export default (state = {}, action) => {
  let newMasterFilteredTreeData;
  let newFilteredTreeDataStateSlice;
  switch (action.type) {
  case types.FILTER_DATA:
    newMasterFilteredTreeData = action.filteredTreeData;
    newFilteredTreeDataStateSlice = Object.assign({}, state, newMasterFilteredTreeData);
    return newFilteredTreeDataStateSlice;
  default:
    return state;
  }
};