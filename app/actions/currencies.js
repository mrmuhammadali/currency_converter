// src
import { CALL_API } from '../middleware/api'

export const SWAP_CURRENCY = 'SWAP_CURRENCY'
export const CHANGE_CURRENCY_AMOUNT = 'CHANGE_CURRENCY_AMOUNT'
export const CHANGE_BASE_CURRENCY = 'CHANGE_BASE_CURRENCY'
export const CHANGE_QUOTE_CURRENCY = 'CHANGE_QUOTE_CURRENCY'

export const swapCurrency = () => ({
  type: SWAP_CURRENCY
})

export const changeCurrencyAmount = amount => ({
  type: CHANGE_CURRENCY_AMOUNT,
  payload: parseFloat(amount)
})

export const changeBaseCurrency = currency => ({
  type: CHANGE_BASE_CURRENCY,
  payload: currency
})

export const changeQuoteCurrency = currency => ({
  type: CHANGE_QUOTE_CURRENCY,
  payload: currency
})

export const CONVERSION_FETCH = 'CONVERSION_FETCH'
export const CONVERSION_FETCH_SUCCESS = 'CONVERSION_FETCH_SUCCESS'
export const CONVERSION_FETCH_FAILURE = 'CONVERSION_FETCH_FAILURE'

export const getConversion = (currency) => ({
  [CALL_API]: {
    types: [
      CONVERSION_FETCH,
      CONVERSION_FETCH_SUCCESS,
      CONVERSION_FETCH_FAILURE
    ],
    endpoint: `http://api.fixer.io/latest?base=${currency}`,
    method: 'GET'
  }
})
