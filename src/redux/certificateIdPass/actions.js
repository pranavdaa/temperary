import types from './types'

const setingTemplate = payload => dispatch => {
  dispatch({
    type: types.TEMPLATE_ID,
    payload: payload,
  })
}

export default setingTemplate
