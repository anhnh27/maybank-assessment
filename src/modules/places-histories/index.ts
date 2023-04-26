import {createDispatcher} from '@anhnh27/reduxtoolkit-action-dispatcher';
import {PayloadAction, createSelector, createSlice} from '@reduxjs/toolkit';
import {PredictItemData} from '~modules/places/types';
import {RootState} from '~redux/index';

const initialState: PredictItemData[] = [];

export const placeHistoriesSlice = createSlice({
  name: 'place-histories',
  initialState,
  reducers: {
    savePlaceToHistory: (state, action: PayloadAction<PredictItemData>) => {
      const index = state.findIndex(x => x.placeId === action.payload.placeId);
      if (index === -1) {
        state.push(action.payload);
      }
    },
  },
});

const placeHistoriesReducer = placeHistoriesSlice.reducer;

export const placeHistoriesDispatcher = createDispatcher(placeHistoriesSlice);

export const historiesSelector = createSelector(
  (state: RootState) => state,
  state => state.histories,
);

export default placeHistoriesReducer;
