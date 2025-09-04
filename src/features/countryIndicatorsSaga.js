import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchIndicatorsRequest,
  fetchIndicatorsSuccess,
  fetchIndicatorsFailure,
} from './countryIndicatorsSlice';

// API call
function fetchIndicatorsApi() {
  return fetch('https://who-drowning.adapptlabs.com/staging/v1/countryIndicators.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    });
}

function* fetchIndicatorsSaga(action) {
  try {
    const countryCode = action.payload;
    console.log('Fetching indicators for country:', countryCode);

    // Get full dataset
    const data = yield call(fetchIndicatorsApi);
    console.log('Fetched dataset:', data);

    // Find the specific country by code
    const country = data.find((item) => item.iso === countryCode);

    if (!country) {
      throw new Error(`No data found for country: ${countryCode}`);
    }

    // Normalize structure to guarantee pieChart, progress, trendsChart exist
    const payload = {
      name: country.name || 'Unknown',
      iso: country.iso || countryCode,
      region: country.region || 'N/A',
      indicators: country.indicators || {},
      progress: country.progress || {},
      trendsChart: country.trendsChart || [],
      pieChart: {
        values: Array.isArray(country.pieChart?.values)
          ? country.pieChart.values
          : [0, 0, 0, 0, 0, 0], // fallback to safe default
      },
    };

    console.log('Normalized payload:', payload);

    yield put(fetchIndicatorsSuccess(payload));
  } catch (error) {
    console.error('Fetch error:', error.message);
    yield put(fetchIndicatorsFailure(error.message));
  }
}

export default function* indicatorsWatcher() {
  yield takeLatest(fetchIndicatorsRequest.type, fetchIndicatorsSaga);
}
