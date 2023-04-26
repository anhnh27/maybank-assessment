import {combineReducers} from '@reduxjs/toolkit';
import placesReducer from './places';
import placeHistoriesReducer from './places-histories';

const rootReducer = combineReducers({
  places: placesReducer,
  histories: placeHistoriesReducer,
});

export default rootReducer;
