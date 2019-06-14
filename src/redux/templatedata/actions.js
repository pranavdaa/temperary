import types from './types'

export const sendtemplate = payload => dispatch => {
  dispatch({
    type: types.TEMPLATE_INFO,
    payload: payload,
  })
}

export const setTemplate = payload => dispatch => {
  dispatch({
    type: types.TEMPLATE_SET,
    payload: payload,
  })
}
