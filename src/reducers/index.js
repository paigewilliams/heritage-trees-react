import getTreeDataReducer from './getTreeData';
import filterTreeDataReducer from './filterTreeData';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  treeData: getTreeDataReducer,
  filteredTreeData: filterTreeDataReducer,
});

export default rootReducer;
