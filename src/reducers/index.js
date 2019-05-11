import getTreeDataReducer from './getTreeData';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  treeData: getTreeDataReducer,
});

export default rootReducer;
