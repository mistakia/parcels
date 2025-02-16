import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import SelectedParcel from './selected-parcel'
import { app_actions } from '@core/app/actions'

const get_selected_parcel_ll_uuid = (state) =>
  state.getIn(['app', 'selected_parcel_ll_uuid'])

const mapStateToProps = createSelector(
  get_selected_parcel_ll_uuid,
  (selected_parcel_ll_uuid) => ({
    selected_parcel_ll_uuid
  })
)

const mapDispatchToProps = {
  set_selected_parcel: app_actions.set_selected_parcel
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedParcel)
