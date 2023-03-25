import { all } from 'redux-saga/effects'

import { appSagas } from './app'
import { parcelSagas } from './parcels'
import { parcel_column_sagas } from './parcel-columns'

export default function* rootSage() {
  yield all([...appSagas, ...parcelSagas, ...parcel_column_sagas])
}
