import types from './types'

export default (state = {}, action) => {
  switch (action.type) {
    case types.TEMPLATE_INFO:
      console.log('Juliete Seazer')
      return { ...state, ...action.payload }
    case types.TEMPLATE_SET:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
