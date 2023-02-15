import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { getParcels } from '@core/parcels'

import ParcelsPage from './parcels'

const mapStateToProps = createSelector(getParcels, (parcels) => ({
  parcels
}))

export default connect(mapStateToProps)(ParcelsPage)
