import types from './types'

const initialState = [
  {
    template: '',
    orgLogo: undefined,
    authoritySig: undefined,
    orgStamp: undefined,
    background: undefined,
    name: '',
  },
]

export default (state = initialState, action) => {
  switch (action.type) {
    case types.TEMPLATE_GET:
      return [...action.payload]

    case types.TEMPLATE_SET:
      return { ...state, ...action.payload }
    case types.TEMPLATE_POST:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
