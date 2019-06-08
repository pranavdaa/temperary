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
      return {
        ...state,
        generated: action.payload,
      }
    case types.CHANGE_CERTIFICATE_STATES:
      console.log('HITTTTTTTTTTTTTTTTTTTTTTTTTTTT')
      return state

    default:
      return state
  }
}
