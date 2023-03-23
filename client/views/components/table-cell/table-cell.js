import React from 'react'
import PropTypes from 'prop-types'

export default function TableCell({ getValue, column }) {
  const value = getValue()
  const is_sorted = column.getIsSorted()
  return (
    <div
      {...{
        className: 'cell',
        style: {
          width: column.getSize(),
          background: is_sorted ? '#f5f5f5' : 'transparent'
        }
      }}>
      <div
        className='cell-content'
        style={{ padding: '5px 8px 6px', minHeight: '32px' }}>
        {value}
      </div>
    </div>
  )
}

TableCell.propTypes = {
  getValue: PropTypes.func,
  column: PropTypes.object
}
