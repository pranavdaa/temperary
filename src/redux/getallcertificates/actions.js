import types from './types'
import axios from '../../utils/cors/axios'
import constants from '../constants'

export const getAllCertificates = payload => dispatch => {
  axios
    .get(`/certificates`, { headers: { Authorization: `Bearer ${constants.JWT}` } })
    .then(response => {
      if (response.data.status === 'success') {
        console.log('APNA time aayega', response)
        console.log(response.data.msg[0].details.Eng)
        dispatch({
          type: types.GET_ALL_CERTIFICATES,
          payload: response.data.msg.map(activity => {
            return { ...activity, key: activity._id }
          }),
        })
      } else {
        console.error('Error while fetching cert Data')
      }
    })
    .catch(err => {
      console.error(`Error while fetching cert data ${err}`)
    })
}
