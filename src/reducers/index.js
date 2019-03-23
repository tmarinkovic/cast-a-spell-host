import { combineReducers } from 'redux';
import scoreReducer from './score';

const rootReducer = combineReducers({
  scoreState: scoreReducer
});

export default rootReducer;