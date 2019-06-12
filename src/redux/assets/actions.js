import types from './types'
import axios from '../../utils/cors/axios'
import constants from '../constants'

export const addAsset = (assetType, assetPaths) => dispatch => {
  let formData = new FormData()

  Object.keys(assetPaths).forEach(key => {
    formData.append(key, assetPaths[key])
  })

  axios
    .post(`/org`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${constants.JWT}`,
      },
    })
    .then(res => {
      if (res.data.status === 'success') {
        getAssets(assetType, dispatch)
      } else {
        console.error('Failed to fetch Org Data')
      }
    })
    .catch(error => {
      console.error(`Error while updating Org Templates: ${error}`)
    })
}
export const updateAsset = (assetType, assetPaths) => dispatch => {
  let formData = new FormData()
  Object.keys(assetPaths).forEach(key => {
    formData.append(key, assetPaths[key].originFileObj)
  })
  axios
    .patch(`/org`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${constants.JWT}`,
      },
    })
    .then(res => {
      console.log('response from action updateassets', res)
      if (res.data.status === 'success') {
        fetchDefaultAssets(assetType)
      } else {
        console.error('Failed to fetch Org Data')
      }
    })
    .catch(error => {
      console.error(`Error while updating Org Templates: ${error}`)
    })
}

export const fetchDefaultAssets = assetType => dispatch => {
  getAssets(assetType, dispatch)
}
const getAssets = (assetType, dispatch) => {
  axios
    .get(`/org`, { headers: { Authorization: `Bearer ${constants.JWT}` } })
    .then(response => {
      if (response.data.status === 'success') {
        dispatch({
          type: types.UPDATE_ASSETS,
          payload: { assetType, assets: response.data.msg },
        })
      } else {
        console.error('Error while fetching Org Data')
      }
    })
    .catch(err => {
      console.error(`Error while fetching org data ${err}`)
    })
}
