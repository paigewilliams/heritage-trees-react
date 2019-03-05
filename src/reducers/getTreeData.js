import * as types from "./../constants/ActionTypes";

export default(state = {}, action) => {
  let newMasterTreeData;
    switch (action.type){
    case types.REQUEST_DATA:
      newMasterTreeData = {
        isFetching: true,
        treeData: action.treeData
      }
      newTreeDataStateSlice = Object.assign({}, state, newMasterTreeData
      );
      return newTreeDataStateSlice;
      default:
      return state;
    }
}
