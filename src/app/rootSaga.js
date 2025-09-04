import { all } from 'redux-saga/effects';
import indicatorsWatcher from '../features/countryIndicatorsSaga';
import countriesWatcher from '../features/countriesSaga'; // example second saga
import versionWatcher from "../features/versionSaga";

export default function* rootSaga() {
  yield all([
    indicatorsWatcher(),  // handles fetchAllIndicatorsRequest
    countriesWatcher(),   // handles country list, filters, etc.
    versionWatcher(),
    // Add more watchers here as needed
  ]);
}
