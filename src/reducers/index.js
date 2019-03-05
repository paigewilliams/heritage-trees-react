import getTreeDataReducer from './getTreeData';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  masterTreeData: getTreeDataReducer
});

export default rootReducer;
