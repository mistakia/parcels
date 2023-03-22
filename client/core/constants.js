/* global IS_DEV */
import config from '@config'

//= ====================================
//  GENERAL
// -------------------------------------
export const BASE_URL = IS_DEV ? 'http://localhost:8080' : config.production_url
export const API_URL = `${BASE_URL}/api`
export const WEBSOCKET_URL = IS_DEV
  ? 'ws://localhost:8080'
  : config.production_wss

export const TABLE_DATA_TYPES = {
  NUMBER: 0,
  TEXT: 1,
  SELECT: 2
}
