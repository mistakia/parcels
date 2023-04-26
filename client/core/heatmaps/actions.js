export const heatmap_actions = {
  LOAD_HEATMAP_TILE: 'LOAD_HEATMAP_TILE',

  GET_HEATMAP_TILE_FAILED: 'GET_HEATMAP_TILE_FAILED',
  GET_HEATMAP_TILE_PENDING: 'GET_HEATMAP_TILE_PENDING',
  GET_HEATMAP_TILE_FULFILLED: 'GET_HEATMAP_TILE_FULFILLED',

  load_heatmap_tile: ({ ne_lat, ne_lon, sw_lat, sw_lon }) => ({
    type: heatmap_actions.LOAD_HEATMAP_TILE,
    payload: { ne_lat, ne_lon, sw_lat, sw_lon }
  }),

  get_heatmap_tile_failed: (opts, error) => ({
    type: heatmap_actions.GET_HEATMAP_TILE_FAILED,
    payload: {
      opts,
      error
    }
  }),

  get_heatmap_tile_pending: (opts) => ({
    type: heatmap_actions.GET_HEATMAP_TILE_PENDING,
    payload: {
      opts
    }
  }),

  get_heatmap_tile_fulfilled: (opts, data) => ({
    type: heatmap_actions.GET_HEATMAP_TILE_FULFILLED,
    payload: {
      opts,
      data
    }
  })
}

export const get_heatmap_tile_actions = {
  pending: heatmap_actions.get_heatmap_tile_pending,
  failed: heatmap_actions.get_heatmap_tile_failed,
  fulfilled: heatmap_actions.get_heatmap_tile_fulfilled
}
