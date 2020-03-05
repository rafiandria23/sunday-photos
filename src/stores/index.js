import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

import photosReducer from '../reducers/photosReducer';
import isLoadingReducer from '../reducers/isLoadingReducer';
import searchReducer from '../reducers/searchReducer';

const reducers = combineReducers({
  photosReducer,
  isLoadingReducer,
  searchReducer
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

export default store;
