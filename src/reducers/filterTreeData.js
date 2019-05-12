import * as types from './../constants/ActionTypes';

export default (state = {}, action) => {
  switch (action.type) {
  case types.FILTER_DATA:
    return Object.assign({}, {}, action.filteredTreeData);
  default:
    return state;
  }
};