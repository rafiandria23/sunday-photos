import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import photosReducer from '../reducers/photosReducer';
import isLoadingReducer from '../reducers/isLoadingReducer';
import searchReducer from '../reducers/searchReducer';

const reducers = combineReducers({
  photosReducer,
  isLoadingReducer,
  searchReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
