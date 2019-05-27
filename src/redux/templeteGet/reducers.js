import types from './types'

const initialState = []

export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_TEMPLATE:
            return [...action.payload]

        default:
            return state
    }
}