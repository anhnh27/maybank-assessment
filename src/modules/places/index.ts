import {createDispatcher} from '@anhnh27/reduxtoolkit-action-dispatcher';
import {PayloadAction, createSelector, createSlice} from '@reduxjs/toolkit';
import {Region} from 'react-native-maps';
import {RootState} from '~redux/index';
import {PlacesState, PredictItemData} from './types';

const initialState: PlacesState = {
  selectedPlace: {
    latitude: 3.1319,
    longitude: 101.6841,
    latitudeDelta: 1,
    longitudeDelta: 1,
  },
  autocomplete: [],
};

export const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    getAutocompletePlaces: (state, _action: PayloadAction<{keyword: string}>) =>
      state,
    saveAutocompletePlaces: (
      state,
      action: PayloadAction<PredictItemData[]>,
    ) => {
      state.autocomplete = action.payload;
    },
    saveSelectedPlace: (state, action: PayloadAction<Region>) => {
      state.selectedPlace = action.payload;
    },
    getPlaceCoordinate: (state, _action: PayloadAction<{placeId: string}>) =>
      state,
  },
});

const placesReducer = placesSlice.reducer;

export const placesDispatcher = createDispatcher(placesSlice);

export const autocompleteSelector = createSelector(
  (state: RootState) => state,
  state => state.places.autocomplete,
);

export const selectedPlaceSelector = createSelector(
  (state: RootState) => state,
  state => state.places.selectedPlace,
);

export default placesReducer;
