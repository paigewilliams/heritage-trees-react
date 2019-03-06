import getTreeDataReducer from './getTreeData';
import getCoordsReducer from './getCoords';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  treeData: getTreeDataReducer,
  currentCoords: getCoordsReducer
});

export default rootReducer;
