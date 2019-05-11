import getTreeDataReducer from './getTreeData';
import filteredTreeDataReducer from './filterTreeData';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  treeData: getTreeDataReducer,
  filteredTreeData: filteredTreeDataReducer,
});

export default rootReducer;
