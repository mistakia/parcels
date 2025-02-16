import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import './selected-parcel.styl'

const render_value = (
  value,
  path = '',
  expanded_state = {},
  toggle_expanded = () => {}
) => {
  if (Array.isArray(value)) {
    return value.map((item, index) => (
      <div key={index} className='parcel-data__item'>
        {render_value(
          item,
          `${path}.${index}`,
          expanded_state,
          toggle_expanded
        )}
      </div>
    ))
  }

  if (value !== null && typeof value === 'object') {
    return render_object(value, path, expanded_state, toggle_expanded)
  }

  return <div>{String(value)}</div>
}

const render_object = (
  obj,
  path = '',
  expanded_state = {},
  toggle_expanded = () => {}
) => {
  return Object.entries(obj)
    .filter(([_, value]) => value != null)
    .map(([key, value]) => {
      const current_path = path ? `${path}.${key}` : key
      const is_complex =
        Array.isArray(value) || (value !== null && typeof value === 'object')

      if (!is_complex) {
        return (
          <div key={current_path} className='parcel-data__item-list'>
            <div className='parcel-data__label'>{key}</div>
            <div className='parcel-data__value'>
              {render_value(
                value,
                current_path,
                expanded_state,
                toggle_expanded
              )}
            </div>
          </div>
        )
      }

      return (
        <div key={current_path} className='parcel-data__item-list'>
          <div
            onClick={() => toggle_expanded(current_path)}
            className='parcel-data__label'>
            <span
              className={`parcel-data__arrow ${expanded_state[current_path] ? 'parcel-data__arrow--expanded' : ''}`}>
              ▶
            </span>
            {key}
          </div>
          {expanded_state[current_path] && (
            <div>
              {render_value(
                value,
                current_path,
                expanded_state,
                toggle_expanded
              )}
            </div>
          )}
        </div>
      )
    })
}

export default function SelectedParcel({
  selected_parcel_ll_uuid,
  set_selected_parcel,
  load_parcel,
  selected_parcel_map
}) {
  const is_open = Boolean(selected_parcel_ll_uuid)
  const [expanded_state, set_expanded_state] = React.useState({})

  const toggle_expanded = (path) => {
    set_expanded_state((prev) => ({
      ...prev,
      [path]: !prev[path]
    }))
  }

  const on_close = () => {
    set_selected_parcel({ ll_uuid: null })
  }

  useEffect(() => {
    if (selected_parcel_ll_uuid) {
      load_parcel({ ll_uuid: selected_parcel_ll_uuid })
    }
  }, [selected_parcel_ll_uuid])

  return (
    <Drawer
      anchor='right'
      open={is_open}
      onClose={on_close}
      sx={{
        width: '40vw',
        maxWidth: 600,
        minWidth: 300,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '40vw',
          maxWidth: 600,
          minWidth: 300,
          boxSizing: 'border-box'
        }
      }}>
      <div className='selected-parcel'>
        <div className='selected-parcel__header'>
          <div className='selected-parcel__header-title'>Parcel Details</div>
          <IconButton onClick={on_close}>
            <CloseIcon />
          </IconButton>
        </div>

        {selected_parcel_map &&
          render_object(
            selected_parcel_map,
            '',
            expanded_state,
            toggle_expanded
          )}
      </div>
    </Drawer>
  )
}

SelectedParcel.propTypes = {
  selected_parcel_ll_uuid: PropTypes.string,
  set_selected_parcel: PropTypes.func.isRequired,
  load_parcel: PropTypes.func.isRequired,
  selected_parcel_map: PropTypes.object
}
