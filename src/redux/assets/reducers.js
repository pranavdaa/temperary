import { actionTypes } from './types'

const initialState = {
  default: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ASSETS_UPDATE:
      state[action.payload.assetType] = assets
      return state
    default:
      return state
  }
}
