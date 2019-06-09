import types from './types'

export default ([], action) => {
  switch (action.type) {
    case types.TEMPLATE_SET:
      console.log('Ross and rachel')
      return { ...state, ...action.payload }
    default:
      return state
  }
}
