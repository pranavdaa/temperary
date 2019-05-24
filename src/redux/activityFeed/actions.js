import types from './types'
import axios from '../../utils/cors/axios'
import constants from '../constants'

const getActivityFeed = payload => dispatch => {
    axios
    .get(
        '/recent',
        {
            headers: { 'Authorization': `Bearer ${constants.JWT}`}
        }
    )
    .then(function(response) {
        dispatch({
            type: types.GET_ACTIVITY_FEED,
            payload: response.data.msg.map(activity => { return {...activity, key: activity._id} })
        })
    })
    .catch(err => {
        console.error("Error while fetching Activity Feed")
    })
} 

export default getActivityFeed