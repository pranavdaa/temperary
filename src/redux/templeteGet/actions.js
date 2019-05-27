import types from './types'
import axios from '../../utils/cors/axios'
import constants from '../constants'

const getActivityFeed = payload => dispatch => {
    axios
        .get(
            '/templates',
            {
                headers: { 'Authorization': `Bearer ${constants.JWT}` }
            }
        )
        .then(function (response) {
            dispatch({
                type: types.GET_TEMPLATE,
                payload: response.data.msg.map(activity => { return { ...activity, key: activity._id } })
            })
        })
        .catch(err => {
            console.error("Error while fetching Template Data")
        })
}

export default getActivityFeed