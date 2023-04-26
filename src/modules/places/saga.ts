import {AxiosResponse} from 'axios';
import {debounce, takeLatest} from 'redux-saga/effects';
import {PromisePayloadAction} from '~modules/types';
import {placesDispatcher} from '.';
import {getAutocompletePlaces, getPlaceCoordinate} from './services';
import {AutocompleteResult, PlaceResult, PredictItemData} from './types';

function* fetchAutocompletePlacesWorker({
  payload,
}: PromisePayloadAction<{keyword: string}>) {
  try {
    const results: AxiosResponse<AutocompleteResult> =
      yield getAutocompletePlaces(payload.keyword);

    if (results.data) {
      placesDispatcher.saveAutocompletePlaces(
        results.data.predictions.map(x => {
          return {
            mainText: x.structured_formatting.main_text,
            secondaryText: x.structured_formatting.secondary_text,
            placeId: x.place_id,
          } as PredictItemData;
        }),
      );
    }
  } catch (error) {
    console.error(error);
  }
}

function* getPlaceCoordinateWorker({
  payload,
}: PromisePayloadAction<{placeId: string}>) {
  try {
    const results: AxiosResponse<PlaceResult> = yield getPlaceCoordinate(
      payload.placeId,
    );

    if (results.data.result.geometry.location) {
      placesDispatcher.saveSelectedPlace({
        latitude: results.data.result.geometry.location.lat,
        longitude: results.data.result.geometry.location.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  } catch (error) {
    console.error(error);
  }
}

export function* placesSagaWatcher() {
  yield debounce(
    250,
    placesDispatcher.getAutocompletePlaces,
    fetchAutocompletePlacesWorker,
  );
  yield takeLatest(
    placesDispatcher.getPlaceCoordinate,
    getPlaceCoordinateWorker,
  );
}
