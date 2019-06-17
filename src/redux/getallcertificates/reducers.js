import types from './types'

const initialState = {
  pending: [],
  generated: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_CERTIFICATES:
      console.log('diddddddddddddddddddddddd')
      return {
        ...state,
        generated: action.payload,
      }
    default:
      return state
  }
}
