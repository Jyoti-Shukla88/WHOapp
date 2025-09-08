// --- indicatorsSaga.js ---
import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchIndicatorsRequest,
  fetchIndicatorsSuccess,
  fetchIndicatorsFailure,
} from "./countryIndicatorsSlice";

// API call
function fetchIndicatorsApi() {
  return fetch(
    "https://who-drowning.adapptlabs.com/staging/v1/countryIndicators.json"
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  });
}

function* fetchIndicatorsSaga(action) {
  try {
    const countryCode = action.payload;
    const data = yield call(fetchIndicatorsApi);

    const country = data.find((item) => item.iso === countryCode);
    if (!country) {
      throw new Error(`No data found for country: ${countryCode}`);
    }

    // Normalize trendsChart (expected shape: [total, male, female])
    const years = Array.from(
      { length: country.trendsChart?.[0]?.length || 0 },
      (_, i) => `${2000 + i}`
    );

    const trends = {
      years,
      total: country.trendsChart?.[0] || [],
      male: country.trendsChart?.[1] || [],
      female: country.trendsChart?.[2] || [],
    };

    // Normalize payload
    const payload = {
      name: country.name || "Unknown",
      iso: country.iso || countryCode,
      region: country.region || "N/A",
      indicators: country.indicators || {},
      progress: country.progress || {},
      trendsChart: trends,
      pieChart: {
        values: Array.isArray(country.pieChart?.values)
          ? country.pieChart.values
          : [0, 0, 0, 0, 0, 0],
      },
    };

    yield put(fetchIndicatorsSuccess(payload));
  } catch (error) {
    yield put(fetchIndicatorsFailure(error.message));
  }
}

export default function* indicatorsWatcher() {
  yield takeLatest(fetchIndicatorsRequest.type, fetchIndicatorsSaga);
}
