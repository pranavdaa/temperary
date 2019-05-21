import types from './types'

const initialState = []

export default (state = initialState, action) => {

    switch(action.type) {
        case types.CREATE_BDOC:
            return [
                ...state,
                action.payload
            ]
        
        default:
            return state;
    }
}