import { connect } from 'react-redux'
import ParcelsLLUUID from './parcels-ll-uuid'
import { app_actions } from '@core/app/actions'

const mapDispatchToProps = {
  set_selected_parcel: app_actions.set_selected_parcel
}

export default connect(null, mapDispatchToProps)(ParcelsLLUUID)
