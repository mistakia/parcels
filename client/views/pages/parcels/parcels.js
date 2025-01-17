import React from 'react'
import PropTypes from 'prop-types'
import Table from 'react-table/index.js'

export default function ParcelsPage({
  parcels,
  selected_parcel_view,
  save_parcels_view,
  parcel_columns,
  load_more_parcels,
  all_parcel_views,
  set_selected_parcel_view_id,
  delete_parcels_view,
  parcel_view_state_changed
}) {
  React.useEffect(() => {
    const view_id = selected_parcel_view.view_id
    if (view_id !== undefined) {
      load_more_parcels({ view_id })
    }
  }, [])

  return (
    <>
      <Table
        data={parcels}
        on_view_change={parcel_view_state_changed}
        on_save_view={save_parcels_view}
        table_state={selected_parcel_view.table_state}
        saved_table_state={selected_parcel_view.saved_table_state}
        all_columns={parcel_columns}
        selected_view={selected_parcel_view}
        select_view={set_selected_parcel_view_id}
        fetch_more={load_more_parcels}
        total_rows_fetched={parcels.length}
        total_row_count={selected_parcel_view.total_row_count}
        is_fetching={selected_parcel_view.is_fetching}
        views={all_parcel_views}
        delete_view={delete_parcels_view}
        disable_splits
      />
    </>
  )
}

ParcelsPage.propTypes = {
  parcels: PropTypes.array,
  parcels_bounding_box: PropTypes.array,
  selected_parcel_view: PropTypes.object,
  save_parcels_view: PropTypes.func,
  parcel_columns: PropTypes.object,
  load_more_parcels: PropTypes.func,
  all_parcel_views: PropTypes.array,
  set_selected_parcel_view_id: PropTypes.func,
  delete_parcels_view: PropTypes.func,
  parcel_view_state_changed: PropTypes.func
}
