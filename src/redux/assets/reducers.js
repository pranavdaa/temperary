import actionTypes from './types'

const initialState = {
  default: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    
    case actionTypes.UPDATE_ASSETS:
        state[action.payload.assetType] = {...action.payload.assets}
        return state

    default:
        return state
  }
}
