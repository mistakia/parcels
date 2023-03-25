export const parcel_column_actions = {
  GET_PARCEL_COLUMNS_FAILED: 'GET_PARCEL_COLUMNS_FAILED',
  GET_PARCEL_COLUMNS_PENDING: 'GET_PARCEL_COLUMNS_PENDING',
  GET_PARCEL_COLUMNS_FULFILLED: 'GET_PARCEL_COLUMNS_FULFILLED',

  get_parcel_columns_pending: (opts) => ({
    type: parcel_column_actions.GET_PARCEL_COLUMNS_PENDING,
    payload: {
      opts
    }
  }),

  get_parcel_columns_failed: (opts, error) => ({
    type: parcel_column_actions.GET_PARCEL_COLUMNS_FAILED,
    payload: {
      opts,
      error
    }
  }),

  get_parcel_columns_fulfilled: (opts, data) => ({
    type: parcel_column_actions.GET_PARCEL_COLUMNS_FULFILLED,
    payload: {
      opts,
      data
    }
  })
}

export const get_parcel_column_actions = {
  failed: parcel_column_actions.get_parcel_columns_failed,
  pending: parcel_column_actions.get_parcel_columns_pending,
  fulfilled: parcel_column_actions.get_parcel_columns_fulfilled
}
