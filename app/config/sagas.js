// libs
import { takeEvery } from 'redux-saga/effects'

// src
import * as ActionTypes from '../actions'

function* fetchLatestConversionRates(action) {
  yield
}

export default function* rootSage() {
  yield takeEvery(ActionTypes.GET_INITIAL_CONVERSION, fetchLatestConversionRates)
}
