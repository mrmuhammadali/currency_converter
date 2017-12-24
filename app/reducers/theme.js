// src
import * as ActionTypes from '../actions/theme'

const initialState = {
  primaryColor: '#4F6D7A'
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case ActionTypes.CHANGE_PRIMARY_COLOR: {
      return { ...state, primaryColor: payload }
    }
    default: {
      return state
    }
  }
}

export default reducer
