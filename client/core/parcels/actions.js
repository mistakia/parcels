export const parcel_actions = {
  GET_PARCELS_FAILED: 'GET_PARCELS_FAILED',
  GET_PARCELS_PENDING: 'GET_PARCELS_PENDING',
  GET_PARCELS_FULFILLED: 'GET_PARCELS_FULFILLED',

  LOAD_MORE_PARCELS: 'LOAD_MORE_PARCELS',

  load_more_parcels: ({ view_id }) => ({
    type: parcel_actions.LOAD_MORE_PARCELS,
    payload: {
      view_id
    }
  }),

  getParcelsPending: (opts) => ({
    type: parcel_actions.GET_PARCELS_PENDING,
    payload: {
      opts
    }
  }),

  getParcelsFailed: (opts, error) => ({
    type: parcel_actions.GET_PARCELS_FAILED,
    payload: {
      opts,
      error
    }
  }),

  getParcelsFulfilled: (opts, data) => ({
    type: parcel_actions.GET_PARCELS_FULFILLED,
    payload: {
      opts,
      data
    }
  })
}

export const getParcelsActions = {
  failed: parcel_actions.getParcelsFailed,
  pending: parcel_actions.getParcelsPending,
  fulfilled: parcel_actions.getParcelsFulfilled
}
