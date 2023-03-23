import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {
  useReactTable,
  flexRender,
  getCoreRowModel
} from '@tanstack/react-table'
import PropTypes from 'prop-types'
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

// import FilterPopper from '@components/filter-popper'
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

export default function Table({ columns, data, on_table_change, table_state }) {
  const set_sorting = (updater_fn) => {
    const new_sorting = updater_fn()
    const new_sort_item = new_sorting[0]
    const sorting = new Map()

    let is_new = true

    for (const sort of table_state.sorting) {
      if (sort.id === new_sort_item.id) {
        is_new = false
        const is_same = sort.desc === new_sort_item.desc
        if (is_same) {
          continue
        }
        sorting.set(new_sort_item.id, new_sort_item)
      } else {
        sorting.set(sort.id, sort)
      }
    }

    if (is_new) {
      sorting.set(new_sort_item.id, new_sort_item)
    }

    on_table_change({ sorting: Array.from(sorting.values()) })
  }

  const table = useReactTable({
    columns,
    data,
    defaultColumn,
    state: table_state.toJS(),
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: set_sorting,
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

  const state_items = []

  if (table_state.sorting) {
    for (const sort of table_state.sorting) {
      // get lable from column
      state_items.push(
        <div key={sort.id} className='state-item'>
          <div className='state-item-content'>
            {sort.desc ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
            <span>{sort.id}</span>
            {/* <ArrowDropDownIcon /> */}
          </div>
        </div>
      )
    }
  }

  return (
    <div
      className={get_string_from_object({
        table: true,
        noselect: is_table_resizing()
      })}>
      <div className='panel'>
        <div className='state'>{state_items}</div>
        <div className='controls'>{/* <FilterPopper /> */}</div>
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
  data: PropTypes.array,
  on_table_change: PropTypes.func,
  table_state: ImmutablePropTypes.record
}
