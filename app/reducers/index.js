// libs
import { combineReducers } from 'redux'
import capitalize from 'lodash/fp/capitalize'
import lowerCase from 'lodash/fp/lowerCase'

// src
import * as ActionTypes from '../actions'
import currencies from './currencies'
import nav from './nav'
import theme from './theme'

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
  const { type, error, payload } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  }
  if (
    type === ActionTypes.CONVERSION_FETCH_SUCCESS &&
    !payload.success &&
    payload.error
  ) {
    return { error: capitalize(lowerCase(payload.error.type)) }
  }
  if (error) {
    return payload || null
  }

  return state
}

export default combineReducers({
  currencies,
  errorMessage,
  nav,
  theme,
})
