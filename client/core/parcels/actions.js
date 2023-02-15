export const parcelActions = {
  GET_PARCELS_FAILED: 'GET_PARCELS_FAILED',
  GET_PARCELS_PENDING: 'GET_PARCELS_PENDING',
  GET_PARCELS_FULFILLED: 'GET_PARCELS_FULFILLED',

  getParcelsPending: (opts) => ({
    type: parcelActions.GET_PARCELS_PENDING,
    payload: {
      opts
    }
  }),

  getParcelsFailed: (opts, error) => ({
    type: parcelActions.GET_PARCELS_FAILED,
    payload: {
      opts,
      error
    }
  }),

  getParcelsFulfilled: (opts, data) => ({
    type: parcelActions.GET_PARCELS_FULFILLED,
    payload: {
      opts,
      data
    }
  })
}

export const getParcelsActions = {
  failed: parcelActions.getParcelsFailed,
  pending: parcelActions.getParcelsPending,
  fulfilled: parcelActions.getParcelsFulfilled
}
