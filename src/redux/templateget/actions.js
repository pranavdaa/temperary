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
