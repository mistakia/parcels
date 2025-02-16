import { combineReducers } from 'redux-immutable'

import { app_reducer } from './app'
import { parcels_reducer } from './parcels'
import { parcel_reducer } from './parcel'
import { parcel_view_reducer } from './parcel-views'
import { parcel_column_reducer } from './parcel-columns'
import { heatmap_reducer } from './heatmaps'
import { parcels_heatmap_reducer } from './parcels-heatmap'

const rootReducer = (router) =>
  combineReducers({
    router,
    app: app_reducer,
    parcels: parcels_reducer,
    parcel: parcel_reducer,
    parcel_views: parcel_view_reducer,
    parcel_columns: parcel_column_reducer,
    heatmaps: heatmap_reducer,
    parcels_heatmap: parcels_heatmap_reducer
  })

export default rootReducer
