export const parcel_view_actions = {
  GET_VIEWS_PENDING: 'GET_VIEWS_PENDING',
  GET_VIEWS_FAILED: 'GET_VIEWS_FAILED',
  GET_VIEWS_FULFILLED: 'GET_VIEWS_FULFILLED',

  POST_PARCEL_VIEW_PENDING: 'POST_PARCEL_VIEW_PENDING',
  POST_PARCEL_VIEW_FAILED: 'POST_PARCEL_VIEW_FAILED',
  POST_PARCEL_VIEW_FULFILLED: 'POST_PARCEL_VIEW_FULFILLED',

  DELETE_PARCEL_VIEW_PENDING: 'DELETE_PARCEL_VIEW_PENDING',
  DELETE_PARCEL_VIEW_FAILED: 'DELETE_PARCEL_VIEW_FAILED',
  DELETE_PARCEL_VIEW_FULFILLED: 'DELETE_PARCEL_VIEW_FULFILLED',

  SAVE_PARCELS_VIEW: 'SAVE_PARCELS_VIEW',
  DELETE_PARCELS_VIEW: 'DELETE_PARCELS_VIEW',

  PARCEL_VIEW_STATE_CHANGED: 'PARCEL_VIEW_STATE_CHANGED',

  save_parcels_view: (parcel_view, view_change_params) => ({
    type: parcel_view_actions.SAVE_PARCELS_VIEW,
    payload: {
      parcel_view,
      view_change_params
    }
  }),

  parcel_view_state_changed: (parcel_view, view_change_params) => ({
    type: parcel_view_actions.PARCEL_VIEW_STATE_CHANGED,
    payload: { parcel_view, view_change_params }
  }),

  delete_parcels_view: (view_id) => ({
    type: parcel_view_actions.DELETE_PARCELS_VIEW,
    payload: {
      view_id
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
  }),

  post_parcel_view_pending: (opts) => ({
    type: parcel_view_actions.POST_PARCEL_VIEW_PENDING,
    payload: {
      opts
    }
  }),

  post_parcel_view_failed: (opts, error) => ({
    type: parcel_view_actions.POST_PARCEL_VIEW_FAILED,
    payload: {
      opts,
      error
    }
  }),

  post_parcel_view_fulfilled: (opts, data) => ({
    type: parcel_view_actions.POST_PARCEL_VIEW_FULFILLED,
    payload: {
      opts,
      data
    }
  }),

  delete_parcel_view_pending: (opts) => ({
    type: parcel_view_actions.DELETE_PARCEL_VIEW_PENDING,
    payload: {
      opts
    }
  }),

  delete_parcel_view_failed: (opts, error) => ({
    type: parcel_view_actions.DELETE_PARCEL_VIEW_FAILED,
    payload: {
      opts,
      error
    }
  }),

  delete_parcel_view_fulfilled: (opts, data) => ({
    type: parcel_view_actions.DELETE_PARCEL_VIEW_FULFILLED,
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

export const post_parcel_view_actions = {
  pending: parcel_view_actions.post_parcel_view_pending,
  failed: parcel_view_actions.post_parcel_view_failed,
  fulfilled: parcel_view_actions.post_parcel_view_fulfilled
}

export const delete_parcel_view_actions = {
  pending: parcel_view_actions.delete_parcel_view_pending,
  failed: parcel_view_actions.delete_parcel_view_failed,
  fulfilled: parcel_view_actions.delete_parcel_view_fulfilled
}
