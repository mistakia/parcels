import React from 'react'
import PropTypes from 'prop-types'

import { get_string_from_object } from '@common'
import { TABLE_DATA_TYPES } from '@core/constants'
import HashIcon from '@images_svg/hash-icon'
import TextIcon from '@images_svg/text-icon'
import MultiIcon from '@images_svg/multi-icon'

const HeaderIcon = ({ data_type }) => {
  switch (data_type) {
    case TABLE_DATA_TYPES.NUMBER:
      return <HashIcon />
    case TABLE_DATA_TYPES.TEXT:
      return <TextIcon />
    case TABLE_DATA_TYPES.SELECT:
      return <MultiIcon />
    default:
      return null
  }
}

HeaderIcon.propTypes = {
  data_type: PropTypes.number
}

export default function TableHeader({ header, column, table }) {
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
          <div className='header-icon'>
            <HeaderIcon data_type={column.columnDef.data_type} />
          </div>
          {column.columnDef.header_label}
        </div>
      </div>
      <div
        {...{
          onMouseDown: header.getResizeHandler(),
          onTouchStart: header.getResizeHandler(),
          className: get_string_from_object({
            resizer: true,
            is_resizing: header.column.getIsResizing()
          }),
          style: {
            transform: header.column.getIsResizing()
              ? `translateX(${table.getState().columnSizingInfo.deltaOffset}px)`
              : ''
          }
        }}
      />
    </div>
  )
}

TableHeader.propTypes = {
  header: PropTypes.object,
  column: PropTypes.object,
  table: PropTypes.object
}
