import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import user from './user/reducers'
import menu from './menu/reducers'
import settings from './settings/reducers'

import assets from './assets/reducers'
import activityFeed from './activityFeed/reducers'
import bdocCreator from './bdoc/create/reducers'
import bdocReader from './bdoc/read/reducers'
import certificates from './certificates/reducers'

export default history =>
  combineReducers({
    router: connectRouter(history),
    user,
    menu,
    settings,
    assets,
    activityFeed,
    bdocCreator,
    bdocReader,
    certificates
  })
