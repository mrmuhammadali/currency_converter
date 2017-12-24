// libs
import { combineReducers } from 'redux'

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
  } else if (error) {
    return payload || null
  }

  return state
}

export default combineReducers({
  currencies,
  errorMessage,
  nav,
  theme
})
