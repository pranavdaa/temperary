import types from './types'

const initialState = []

export default (state = initialState, action) => {
    switch(action.type) {
        case types.GET_ACTIVITY_FEED:
            return action.payload

        default:
            return state
    }
}