import { configureStore } from '@reduxjs/toolkit';
const createSagaMiddleware = require('redux-saga').default;
import countriesReducer from '../features/countriesSlice';
import countryIndicatorsReducer from '../features/countryIndicatorsSlice';
import versionReducer from "../features/versionslice";
import rootSaga from './rootSaga';
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    indicators: countryIndicatorsReducer,
    version: versionReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

