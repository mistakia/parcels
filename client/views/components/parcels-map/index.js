import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { get_parcels_bounding_box, get_parcel_features } from '@core/parcels'

import ParcelsMap from './parcels-map'

const mapStateToProps = createSelector(
  get_parcels_bounding_box,
  get_parcel_features,
  (parcels_bounding_box, parcel_features) => ({
    parcels_bounding_box,
    parcel_features
  })
)

export default connect(mapStateToProps)(ParcelsMap)
