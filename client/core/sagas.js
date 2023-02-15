import { all } from 'redux-saga/effects'

import { appSagas } from './app'
import { parcelSagas } from './parcels'

export default function* rootSage() {
  yield all([...appSagas, ...parcelSagas])
}
