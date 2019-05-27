import types from './types'
import axios from '../../utils/cors/axios'
import constants from '../constants'

export const parseExcelToJson = payload => dispatch => {
    axios
    .post(`/parse/excel`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${constants.JWT}`,
      },
    })
    .then(res => {
        if(res.data.status === 'success') {
            console.log(res.data.msg)
            dispatch({
                type: types.PARSE_EXCEL,
                payload: res.data.msg
            })
        }
        else {
            console.error("Failed to fetch Org Data")
        }
    })
    .catch(error => {
      console.error(`Error while updating Org Templates: ${error}`)
    })  
}

export const getAllCertificates = payload => dispatch => {

}

export const generateCertificates = payload => dispatch => {
    //on success dispatch getAllCertificates
}

export const changeCertificateState = payload => dispatch => {
    //on success dispatch getAllCertificates
}