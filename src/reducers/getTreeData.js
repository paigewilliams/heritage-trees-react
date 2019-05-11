import * as types from './../constants/ActionTypes';

export default (state = {}, action) => {
  let newMasterTreeData;
  let newTreeDataStateSlice;
  switch (action.type) {
  case types.REQUEST_DATA:
    newMasterTreeData = action.treeData;
    newTreeDataStateSlice = Object.assign({}, state, newMasterTreeData
    );
    return newTreeDataStateSlice;
  default:
    return state;
  }
};
