export const parcels_heatmap_actions = {
  GET_HEATMAP_FAILED: 'GET_HEATMAP_FAILED',
  GET_HEATMAP_PENDING: 'GET_HEATMAP_PENDING',
  GET_HEATMAP_FULFILLED: 'GET_HEATMAP_FULFILLED',
  LOAD_PARCELS_HEATMAP: 'LOAD_PARCELS_HEATMAP',

  load_parcels_heatmap: () => ({
    type: parcels_heatmap_actions.LOAD_PARCELS_HEATMAP
  }),

  get_heatmap_pending: (opts) => ({
    type: parcels_heatmap_actions.GET_HEATMAP_PENDING,
    payload: {
      opts
    }
  }),

  get_heatmap_failed: (opts, error) => ({
    type: parcels_heatmap_actions.GET_HEATMAP_FAILED,
    payload: {
      opts,
      error
    }
  }),

  get_heatmap_fulfilled: (opts, data) => ({
    type: parcels_heatmap_actions.GET_HEATMAP_FULFILLED,
    payload: {
      opts,
      data
    }
  })
}

export const get_parcels_heatmap_actions = {
  failed: parcels_heatmap_actions.get_heatmap_failed,
  pending: parcels_heatmap_actions.get_heatmap_pending,
  fulfilled: parcels_heatmap_actions.get_heatmap_fulfilled
}
