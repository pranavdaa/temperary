import types from './types'
import axios from '../../utils/cors/axios'
import constants from '../constants'
export const getTemplates = payload => dispatch => {
  axios
    .get('/templates', {
      headers: { Authorization: `Bearer ${constants.JWT}` },
    })
    .then(function(response) {
      console.log('frustated', response.data.msg[0].orgId)
      dispatch({
        type: types.TEMPLATE_GET,
        payload: response.data.msg.map(activity => {
          return { ...activity, key: activity._id }
        }),
      })
    })
    .catch(err => {
      console.error('Error while fetching Template Data')
    })
}

export const setTemplate = payload => dispatch => {
  dispatch({
    type: types.TEMPLATE_SET,
    payload: payload,
  })
}

export const createTemplate = (assetType, params) => dispatch => {
  let formData = new FormData()

  Object.keys(params).forEach(key => {
    formData.append(key, params[key])
  })

  axios
    .post(`/template`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${constants.JWT}`,
      },
    })
    .then(res => {
      if (res.data.status === 'success') {
      } else {
        console.error('Failed to fetch Org Data')
      }
    })
    .catch(error => {
      console.error(`Error while updating Org Templates: ${error}`)
    })
}
