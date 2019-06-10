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
export const changeCertificateState = (certificateId, status) => dispatch => {
  //creates an object

  axios
    .patch(
      `/certificates`,
      { certificateIds: certificateId, status: status },
      {
        headers: {
          Authorization: `Bearer ${constants.JWT}`,
        },
      },
    )
    .then(res => {
      console.log('From Action response', res)
      if (res.data.status === 'success') {
        dispatch(getAllCertificates())
      } else {
        console.error('Failed to update certificates')
      }
    })
    .catch(error => {
      console.error(`Error while updating Certificates: ${error}`)
    })
}
export const generateCertificates = (id, template, sheetdata) => dispatch => {
  //on success dispatch getAllCertificates
  console.log('Ml and AI', template)

  var finalsheet = JSON.stringify(sheetdata)
  axios
    .post(
      `/certificates`,
      { templateId: id, certificate: template, sheetData: finalsheet },

      {
        headers: {
          // for file upload only use multipart
          Authorization: `Bearer ${constants.JWT}`,
        },
      },
    )
    .then(res => {
      console.log('lets start with a bang', res)
      if (res.data.status === 'success') {
        dispatch({
          type: types.GENERATE_CERTIFICATES,
        })
      } else {
        console.error('Failed to fetch Cert Data')
      }
    })
    .catch(error => {
      console.error(`Error while updating Cert Templates: ${error}`)
    })
}
