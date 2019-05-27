import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import user from './user/reducers'
import menu from './menu/reducers'
import settings from './settings/reducers'
import activityFeed from './activityFeed/reducers'
import assets from './assets/reducers'
import templates from './template/reducers'
import bdocCreator from './bdoc/create/reducers'
import bdocReader from './bdoc/read/reducers'

export default history =>
  combineReducers({
    router: connectRouter(history),
    user,
    menu,
    settings,
    assets,
    templates,
    activityFeed,
    bdocCreator,
    bdocReader
  })
