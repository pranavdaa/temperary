import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import user from './user/reducers'
import menu from './menu/reducers'
import settings from './settings/reducers'

import assets from './assets/reducers'
import bdocCreator from './bdoc/create/reducers'
import bdocReader from './bdoc/read/reducers'

export default history =>
  combineReducers({
    router: connectRouter(history),
    user,
    menu,
    settings,
    assets,
    bdocCreator,
    bdocReader
  })
