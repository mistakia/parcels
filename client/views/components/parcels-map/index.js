import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { get_parcels_bounding_box } from '@core/parcels'

import ParcelsMap from './parcels-map'

const mapStateToProps = createSelector(
  get_parcels_bounding_box,
  (parcels_bounding_box) => ({
    parcels_bounding_box
  })
)

export default connect(mapStateToProps)(ParcelsMap)
