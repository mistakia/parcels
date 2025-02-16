import React from 'react'
import PropTypes from 'prop-types'

const ParcelsLLUUID = ({ row, set_selected_parcel }) => {
  const handle_click = () => {
    set_selected_parcel({ ll_uuid: row.original.ll_uuid })
  }

  return (
    <div
      onClick={handle_click}
      style={{
        cursor: 'pointer',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      {row.original.ll_uuid}
    </div>
  )
}

ParcelsLLUUID.propTypes = {
  row: PropTypes.object,
  set_selected_parcel: PropTypes.func
}

export default ParcelsLLUUID
