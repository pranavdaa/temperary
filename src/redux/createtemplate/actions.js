import types from './types'

export const setTemplate = payload => dispatch => {
  dispatch({
    type: types.TEMPLATE_SET,
    payload: payload,
  })
}
