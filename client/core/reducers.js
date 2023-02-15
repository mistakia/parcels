import { combineReducers } from 'redux-immutable'

import { appReducer } from './app'
import { parcelsReducer } from './parcels'

const rootReducer = (router) =>
  combineReducers({
    router,
    app: appReducer,
    parcels: parcelsReducer
  })

export default rootReducer
