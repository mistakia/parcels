import React from 'react'
import PropTypes from 'prop-types'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

const DRAWER_WIDTH = 400

export default function SelectedParcel({
  selected_parcel_ll_uuid,
  set_selected_parcel
}) {
  const is_open = Boolean(selected_parcel_ll_uuid)

  const on_close = () => {
    set_selected_parcel({ ll_uuid: null })
  }

  return (
    <Drawer
      anchor='right'
      open={is_open}
      onClose={on_close}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box'
        }
      }}>
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2
          }}>
          <Typography variant='h6'>Parcel Details</Typography>
          <IconButton onClick={on_close}>
            <CloseIcon />
          </IconButton>
        </Box>

        {selected_parcel_ll_uuid && (
          <Box>
            <Typography>Parcel ID: {selected_parcel_ll_uuid}</Typography>
            {/* Add more parcel details here as needed */}
          </Box>
        )}
      </Box>
    </Drawer>
  )
}

SelectedParcel.propTypes = {
  selected_parcel_ll_uuid: PropTypes.string,
  set_selected_parcel: PropTypes.func.isRequired
}
