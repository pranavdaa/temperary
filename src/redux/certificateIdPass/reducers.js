import types from './types'

export default (state = {}, action) => {
  switch (action.type) {
    case types.TEMPLATE_ID:
      console.log('Ross and rachel')
      return { ...state, ...action.payload }
    default:
      return state
  }
}
