// libs
import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

// src
import api from '../middleware/api'
import reducers from '../reducers'

const middleware = [thunk, api]

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({ collapsed: true })
  middleware.push(logger)
}

const store = createStore(reducers, applyMiddleware(...middleware))

export default store
