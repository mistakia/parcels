import React from 'react'
import PropTypes from 'prop-types'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'

import Routes from '@views/routes'
import Menu from '@components/menu/menu'

export default function App({ load, is_loaded }) {
  React.useEffect(() => {
    load()
  }, [])

  if (!is_loaded) {
    return (
      <div className='load__container'>
        <Box sx={{ width: '100px', paddingTop: '2em' }}>
          <LinearProgress color='inherit' />
        </Box>
      </div>
    )
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Menu />
      <Box sx={{ width: '100%' }}>
        <Routes />
      </Box>
    </Box>
  )
}

App.propTypes = {
  load: PropTypes.func,
  is_loaded: PropTypes.bool
}
