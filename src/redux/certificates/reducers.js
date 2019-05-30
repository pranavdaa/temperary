import types from './types'

const initialState = {
    pending: [],
    generated: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case types.PARSE_EXCEL:
            return {
                ...state,
                pending: action.payload
            }

        case types.GET_ALL_CERTIFICATES:
            return {
                ...state,
                generated: action.payload
            }

        default:
            return state
    }
}