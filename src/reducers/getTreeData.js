import * as types from './../constants/ActionTypes';

export default(state = {}, action) => {
  let newMasterTreeData;
  switch (action.type){
  case types.REQUEST_DATA:
    newMasterTreeData = action.treeData
     let newTreeDataStateSlice = Object.assign({}, state, newMasterTreeData
    );
    return newTreeDataStateSlice;
  default:
    return state;
  }
};
