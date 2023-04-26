import {all, fork} from 'redux-saga/effects';
import * as placesSaga from './places/saga';

export default function* rootSaga() {
  const forkedSagas = [...Object.values(placesSaga)].map(fork);
  yield all([...forkedSagas]);
}
