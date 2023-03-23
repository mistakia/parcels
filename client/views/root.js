import React from 'react'
import { Provider } from 'react-redux'
import { HistoryRouter as Router } from 'redux-first-history/rr6'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import L from 'leaflet'

import { store, history } from '@core/store.js'
import storeRegistry from '@core/store-registry'
import App from '@components/app'

import 'leaflet/dist/leaflet.css'
import '@styles/normalize.css'
import '@styles/typography.styl'
import '@styles/mui-unstyled-popper.styl'

import markerIcon from '../../node_modules/leaflet/dist/images/marker-icon.png'
import markerIcon2x from '../../node_modules/leaflet/dist/images/marker-icon-2x.png'
import markerShadow from '../../node_modules/leaflet/dist/images/marker-shadow.png'

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
})

storeRegistry.register(store)

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000'
    },
    secondary: {
      main: '#FF0000'
    }
  }
})

const Root = () => (
  <Provider store={store}>
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </Provider>
)

export default Root
