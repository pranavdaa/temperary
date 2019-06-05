import types from './types'
import axios from '../../utils/cors/axios'
import constants from '../constants'

export const parseExcelToJson = payload => dispatch => {
  axios
    .post(`/parse/excel`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${constants.JWT}`,
      },
    })
    .then(res => {
      if (res.data.status === 'success') {
        dispatch({
          type: types.PARSE_EXCEL,
          payload: res.data.msg,
        })
      } else {
        console.error('Failed to fetch Org Data')
      }
    })
    .catch(error => {
      console.error(`Error while posting org certificate: ${error}`)
    })
}
export const getAllCertificates = payload => dispatch => {
  axios
    .get(`/certificates`, { headers: { Authorization: `Bearer ${constants.JWT}` } })
    .then(response => {
      if (response.data.status === 'success') {
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

export const generateCertificates = payload => dispatch => {
  //on success dispatch getAllCertificates
  axios
    .post(`/certificates`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${constants.JWT}`,
      },
    })
    .then(res => {
      if (res.data.status === 'success') {
        dispatch({
          type: types.GENERATE_CERTIFICATES,
          payload: res.data.msg,
        })
      } else {
        console.error('Failed to fetch Cert Data')
      }
    })
    .catch(error => {
      console.error(`Error while updating Cert Templates: ${error}`)
    })
}

export const changeCertificateState = payload => dispatch => {
  //on success dispatch getAllCertificates
}
