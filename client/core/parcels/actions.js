export const parcel_actions = {
  GET_PARCELS_FAILED: 'GET_PARCELS_FAILED',
  GET_PARCELS_PENDING: 'GET_PARCELS_PENDING',
  GET_PARCELS_FULFILLED: 'GET_PARCELS_FULFILLED',

  GET_PARCELS_COUNT_FAILED: 'GET_PARCELS_COUNT_FAILED',
  GET_PARCELS_COUNT_PENDING: 'GET_PARCELS_COUNT_PENDING',
  GET_PARCELS_COUNT_FULFILLED: 'GET_PARCELS_COUNT_FULFILLED',

  LOAD_MORE_PARCELS: 'LOAD_MORE_PARCELS',

  load_more_parcels: ({ view_id }) => ({
    type: parcel_actions.LOAD_MORE_PARCELS,
    payload: {
      view_id
    }
  }),

  get_parcels_pending: (opts) => ({
    type: parcel_actions.GET_PARCELS_PENDING,
    payload: {
      opts
    }
  }),

  get_parcels_failed: (opts, error) => ({
    type: parcel_actions.GET_PARCELS_FAILED,
    payload: {
      opts,
      error
    }
  }),

  get_parcels_fulfilled: (opts, data) => ({
    type: parcel_actions.GET_PARCELS_FULFILLED,
    payload: {
      opts,
      data
    }
  }),

  get_parcels_count_pending: (opts) => ({
    type: parcel_actions.GET_PARCELS_COUNT_PENDING,
    payload: {
      opts
    }
  }),

  get_parcels_count_failed: (opts, error) => ({
    type: parcel_actions.GET_PARCELS_COUNT_FAILED,
    payload: {
      opts,
      error
    }
  }),

  get_parcels_count_fulfilled: (opts, data) => ({
    type: parcel_actions.GET_PARCELS_COUNT_FULFILLED,
    payload: {
      opts,
      data
    }
  })
}

export const get_parcels_actions = {
  failed: parcel_actions.get_parcels_failed,
  pending: parcel_actions.get_parcels_pending,
  fulfilled: parcel_actions.get_parcels_fulfilled
}

export const get_parcels_count_actions = {
  failed: parcel_actions.get_parcels_count_failed,
  pending: parcel_actions.get_parcels_count_pending,
  fulfilled: parcel_actions.get_parcels_count_fulfilled
}
