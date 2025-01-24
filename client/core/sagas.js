import { all } from 'redux-saga/effects'

import { appSagas } from './app'
import { parcelSagas } from './parcels'
import { parcel_column_sagas } from './parcel-columns'
import { parcel_view_sagas } from './parcel-views'
import { heatmap_sagas } from './heatmaps'
import { parcels_heatmap_sagas } from './parcels-heatmap'

export default function* rootSage() {
  yield all([
    ...appSagas,
    ...parcelSagas,
    ...parcel_column_sagas,
    ...parcel_view_sagas,
    ...heatmap_sagas,
    ...parcels_heatmap_sagas
  ])
}
