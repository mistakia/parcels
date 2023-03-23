import { combineReducers } from 'redux-immutable'

import { appReducer } from './app'
import { parcelsReducer } from './parcels'
import { parcel_view_reducer } from './parcel-views'

const rootReducer = (router) =>
  combineReducers({
    router,
    app: appReducer,
    parcels: parcelsReducer,
    parcel_views: parcel_view_reducer
  })

export default rootReducer
