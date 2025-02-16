import { all } from 'redux-saga/effects'

import { appSagas } from './app'
import { parcel_sagas } from './parcel'
import { parcels_sagas } from './parcels'
import { parcel_column_sagas } from './parcel-columns'
import { parcel_view_sagas } from './parcel-views'
import { heatmap_sagas } from './heatmaps'
import { parcels_heatmap_sagas } from './parcels-heatmap'

export default function* rootSage() {
  yield all([
    ...appSagas,
    ...parcel_sagas,
    ...parcels_sagas,
    ...parcel_column_sagas,
    ...parcel_view_sagas,
    ...heatmap_sagas,
    ...parcels_heatmap_sagas
  ])
}
