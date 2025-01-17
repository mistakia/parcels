import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import PropTypes from 'prop-types'
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom'

import { get_app } from '@core/app'
import AuthPage from '@pages/auth'
import ParcelsPage from '@pages/parcels'
import MapPage from '@pages/map'

const map_state_to_props = createSelector(get_app, (app) => ({
  public_key: app.public_key
}))

const Routes = ({ public_key }) => {
  if (!public_key) {
    return (
      <RouterRoutes>
        <Route path='/auth' element={<AuthPage />} />
        <Route path='*' element={<Navigate to='/auth' />} />
      </RouterRoutes>
    )
  }

  return (
    <RouterRoutes>
      <Route path='/parcels' element={<ParcelsPage />} />
      <Route path='/map' element={<MapPage />} />
      <Route path='*' element={<Navigate to='/parcels' />} />
    </RouterRoutes>
  )
}

Routes.propTypes = {
  public_key: PropTypes.string
}

export default connect(map_state_to_props)(Routes)
