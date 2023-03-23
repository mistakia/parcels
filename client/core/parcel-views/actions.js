export const parcel_view_actions = {
  SET_PARCELS_VIEW_TABLE_STATE: 'SET_PARCELS_VIEW_TABLE_STATE',

  set_parcels_view_table_state: ({ view_id, view_table_state }) => ({
    type: parcel_view_actions.SET_PARCELS_VIEW_TABLE_STATE,
    payload: {
      view_id,
      view_table_state
    }
  })
}
