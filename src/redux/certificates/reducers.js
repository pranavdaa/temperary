import types from './types'

const initialState = {
  pending: [],
  generated: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.PARSE_EXCEL:
      return {
        ...state,
        pending: action.payload,
      }

    case types.GET_ALL_CERTIFICATES:
      console.log('HIT')
      return {
        ...state,
        generated: action.payload,
      }
    case types.CHANGE_CERTIFICATE_STATES:
      state[action.payload.assetType] = { ...action.payload.assets }
      return state

    default:
      return state
  }
}
