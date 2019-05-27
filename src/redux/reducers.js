import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import user from './user/reducers'
import menu from './menu/reducers'
import settings from './settings/reducers'
<<<<<<< HEAD

import assets from './assets/reducers'
=======
import activityFeed from './activityFeed/reducers'
import assets from './assets/reducers'
import templates from './templeteGet/reducers'
import bdocCreator from './bdoc/create/reducers'
import bdocReader from './bdoc/read/reducers'
>>>>>>> 4008be6... Get req for templete

export default history =>
  combineReducers({
    router: connectRouter(history),
    user,
    menu,
    settings,
    assets,
<<<<<<< HEAD
=======
    templates,
    activityFeed,
    bdocCreator,
    bdocReader
>>>>>>> 4008be6... Get req for templete
  })
