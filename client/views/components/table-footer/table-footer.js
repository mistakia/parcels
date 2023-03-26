import React from 'react'
import PropTypes from 'prop-types'

export default function TableFooter({ column, header }) {
  if (column.columnDef.id === 'add_column_action') {
    return null
  }

  return (
    <div
      {...{
        className: 'cell',
        key: header.id,
        colSpan: header.colSpan,
        style: {
          width: header.getSize()
        }
      }}>
      <div className='cell-content'>
        <div style={{ display: 'flex ', alignItems: 'center', height: '100%' }}>
          {column.columnDef.footer_label}
        </div>
      </div>
    </div>
  )
}

TableFooter.propTypes = {
  column: PropTypes.object,
  header: PropTypes.object
}
