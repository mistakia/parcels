import { Record } from 'immutable'

export const ParcelViewTableState = new Record({
  sorting: [],
  columns: []
})

export const ParcelView = new Record({
  id: null,
  name: null,
  table_state: new ParcelViewTableState()
})
