import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { get_parcels, get_parcels_bounding_box } from '@core/parcels'

import ParcelsPage from './parcels'

const mapStateToProps = createSelector(
  get_parcels,
  get_parcels_bounding_box,
  (parcels, parcels_bounding_box) => ({
    parcels,
    parcels_bounding_box
  })
)

export default connect(mapStateToProps)(ParcelsPage)
