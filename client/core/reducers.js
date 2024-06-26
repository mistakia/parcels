import { combineReducers } from 'redux-immutable'

import { appReducer } from './app'
import { parcelsReducer } from './parcels'
import { parcel_view_reducer } from './parcel-views'
import { parcel_column_reducer } from './parcel-columns'
import { heatmap_reducer } from './heatmaps'

const rootReducer = (router) =>
  combineReducers({
    router,
    app: appReducer,
    parcels: parcelsReducer,
    parcel_views: parcel_view_reducer,
    parcel_columns: parcel_column_reducer,
    heatmaps: heatmap_reducer
  })

export default rootReducer
