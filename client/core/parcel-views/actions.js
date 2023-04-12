export const parcel_view_actions = {
  GET_VIEWS_PENDING: 'GET_VIEWS_PENDING',
  GET_VIEWS_FAILED: 'GET_VIEWS_FAILED',
  GET_VIEWS_FULFILLED: 'GET_VIEWS_FULFILLED',

  SET_PARCELS_VIEW_TABLE_STATE: 'SET_PARCELS_VIEW_TABLE_STATE',

  set_parcels_view_table_state: ({ view_id, view_table_state }) => ({
    type: parcel_view_actions.SET_PARCELS_VIEW_TABLE_STATE,
    payload: {
      view_id,
      view_table_state
    }
  }),

  get_views_pending: (opts) => ({
    type: parcel_view_actions.GET_VIEWS_PENDING,
    payload: {
      opts
    }
  }),

  get_views_failed: (opts, error) => ({
    type: parcel_view_actions.GET_VIEWS_FAILED,
    payload: {
      opts,
      error
    }
  }),

  get_views_fulfilled: (opts, data) => ({
    type: parcel_view_actions.GET_VIEWS_FULFILLED,
    payload: {
      opts,
      data
    }
  })
}

export const get_parcel_views_actions = {
  pending: parcel_view_actions.get_views_pending,
  failed: parcel_view_actions.get_views_failed,
  fulfilled: parcel_view_actions.get_views_fulfilled
}
