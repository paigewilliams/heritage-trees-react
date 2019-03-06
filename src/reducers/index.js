import getTreeDataReducer from './getTreeData';
import getCoordsReducer from './getCoords';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  masterTreeData: getTreeDataReducer,
  currentCoords: getCoordsReducer
});

export default rootReducer;
