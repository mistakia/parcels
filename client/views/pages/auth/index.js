import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { get_app, app_actions } from '@core/app'

import AuthPage from './auth'

const map_dispatch_to_props = {
  load_from_new_keypair: app_actions.load_from_new_keypair,
  load_from_private_key: app_actions.load_from_private_key
}

const map_state_to_props = createSelector(get_app, (app) => ({
  private_key: app.private_key
}))

export default connect(map_state_to_props, map_dispatch_to_props)(AuthPage)
