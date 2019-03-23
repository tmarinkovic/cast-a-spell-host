import {createStore, compose} from 'redux';
import scoreReducer from '../reducers/score';

const enhancers = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(
  scoreReducer,
  undefined,
  enhancers
);

export default store;