import React from 'react'
import {
  useReactTable,
  flexRender,
  getCoreRowModel
} from '@tanstack/react-table'
import PropTypes from 'prop-types'

import FilterPopper from '@components/filter-popper'
import TableCell from '@components/table-cell'
import TableHeader from '@components/table-header'
import TableFooter from '@components/table-footer'
import { get_string_from_object } from '@common'

import './table.styl'

const defaultColumn = {
  minWidth: 50,
  width: 150,
  maxWidth: 400,
  cell: TableCell,
  header: TableHeader,
  footer: TableFooter,
  sortType: 'alphanumericFalsyLast'
}

export default function Table({ columns, data }) {
  const table = useReactTable({
    columns,
    data,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange'
  })

  function is_table_resizing() {
    for (const headerGroup of table.getHeaderGroups()) {
      for (const header of headerGroup.headers) {
        if (header.column.getIsResizing()) {
          return true
        }
      }
    }

    return false
  }

  return (
    <div
      className={get_string_from_object({
        table: true,
        noselect: is_table_resizing()
      })}>
      <div className='controls'>
        <FilterPopper />
      </div>
      <div className='header'>
        {table.getHeaderGroups().map((headerGroup) => (
          <div key={headerGroup.id} className='row'>
            {headerGroup.headers.map((header) =>
              header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )
            )}
          </div>
        ))}
      </div>
      {table.getRowModel().rows.map((row) => (
        <div key={row.id} className='row'>
          {row
            .getVisibleCells()
            .map((cell) =>
              flexRender(cell.column.columnDef.cell, cell.getContext())
            )}
        </div>
      ))}
      <div className='footer'>
        {table.getFooterGroups().map((footerGroup) => (
          <div key={footerGroup.id} className='row'>
            {footerGroup.headers.map((footer) =>
              footer.isPlaceholder
                ? null
                : flexRender(
                    footer.column.columnDef.footer,
                    footer.getContext()
                  )
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

Table.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array
}
