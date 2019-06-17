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
import certificates from './certificates/reducers'
import templateId from './certificateIdPass/reducers'
import certificateData from './templatedata/reducers'
import templateget from './templateget/reducers'
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
    bdocReader,
    certificates,
    templateId,
    certificateData,
    templateget,
  })
