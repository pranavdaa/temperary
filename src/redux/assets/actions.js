import { actionTypes } from './types'
import axios from '../../utils/cors/axios'

export const updateAsset = (assetType, assetPaths) => dispatch => {
  let formData = new FormData()
  Object.keys(assetPaths).forEach(key => {
    formData.append(key, assetPaths[key])
  })
  console.log('formdata', formData)
  // TODO::Change this to Pathc
  axios
    .post(`/org`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => {
      console.log(res)
      // dispatch({
      //     type: actionTypes.ASSETS_UPDATE,
      //     payload: {assetType,res.data.msg}
      // })
    })
    .catch(error => {
      console.error(error)
    })
}
