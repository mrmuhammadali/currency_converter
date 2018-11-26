// libs
import { combineReducers } from 'redux'
import flow from 'lodash/fp/flow'
import keys from 'lodash/fp/keys'
import sortBy from 'lodash/fp/sortBy'
import uniq from 'lodash/fp/uniq'

// src
import * as ActionTypes from '../actions/currencies'

const isLoading = (state = false, action) => {
  switch (action.type) {
    case ActionTypes.CONVERSION_FETCH:
      return true
    case ActionTypes.CONVERSION_FETCH_SUCCESS:
    case ActionTypes.CONVERSION_FETCH_FAILURE:
      return false
    default:
      return state
  }
}

const initialState = {
  baseCurrency: 'EUR',
  quoteCurrency: 'USD',
  amount: 1,
  conversions: {},
  currencyList: [],
}

const data = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case ActionTypes.SWAP_CURRENCY: {
      const { baseCurrency, quoteCurrency } = state

      return {
        ...state,
        baseCurrency: quoteCurrency,
        quoteCurrency: baseCurrency,
      }
    }
    case ActionTypes.CHANGE_CURRENCY_AMOUNT: {
      return { ...state, amount: payload || 0 }
    }
    case ActionTypes.CHANGE_BASE_CURRENCY: {
      return { ...state, baseCurrency: payload }
    }
    case ActionTypes.CHANGE_QUOTE_CURRENCY: {
      return { ...state, quoteCurrency: payload }
    }
    case ActionTypes.CONVERSION_FETCH_SUCCESS: {
      const { base, rates } = payload
      const currencyList = flow(
        keys,
        array => [...state.currencyList, ...array],
        uniq,
        sortBy(''),
      )(rates)

      return {
        ...state,
        currencyList,
        conversions: { ...state.conversions, [base]: payload },
      }
    }
    default: {
      return state
    }
  }
}

export default combineReducers({ isLoading, data })
