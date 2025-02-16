export const parcel_actions = {
  LOAD_PARCEL: 'LOAD_PARCEL',

  GET_PARCEL_FAILED: 'GET_PARCEL_FAILED',
  GET_PARCEL_PENDING: 'GET_PARCEL_PENDING',
  GET_PARCEL_FULFILLED: 'GET_PARCEL_FULFILLED',

  load_parcel: ({ ll_uuid }) => ({
    type: parcel_actions.LOAD_PARCEL,
    payload: { ll_uuid }
  }),

  get_parcel_failed: (opts, error) => ({
    type: parcel_actions.GET_PARCEL_FAILED,
    payload: {
      opts,
      error
    }
  }),

  get_parcel_pending: (opts) => ({
    type: parcel_actions.GET_PARCEL_PENDING,
    payload: {
      opts
    }
  }),

  get_parcel_fulfilled: (opts, data) => ({
    type: parcel_actions.GET_PARCEL_FULFILLED,
    payload: {
      opts,
      data
    }
  })
}

export const get_parcel_actions = {
  pending: parcel_actions.get_parcel_pending,
  failed: parcel_actions.get_parcel_failed,
  fulfilled: parcel_actions.get_parcel_fulfilled
}
