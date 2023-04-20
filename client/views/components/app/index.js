import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { getApp, app_actions } from '@core/app'

import App from './app'

const mapStateToProps = createSelector(getApp, (app) => ({
  is_loaded: app.isLoaded
}))

const mapDispatchToProps = {
  load: app_actions.load
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
