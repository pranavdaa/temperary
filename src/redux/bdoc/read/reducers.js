import types from './types'

const initialState = {}

export default (state = initialState, action) => {
    switch(action.type) {

        case types.READ_BDOC: 
            return action.payload

        case types.READ_COMPLETE:
            return {
                ...state,
                isReading: false
            }
        
        default: 
            return state
    }
}