import types from './types'

const initialState = {}

export default (state = initialState, action) => {
    switch(action.type) {
        
        case types.READ_BDOC: 
            return action.payload
        
        default: 
            return state
    }
}