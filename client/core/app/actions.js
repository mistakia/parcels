export const app_actions = {
  APP_LOAD: 'APP_LOAD',
  APP_LOADED: 'APP_LOADED',

  SET_SELECTED_PARCEL_VIEW_ID: 'SET_SELECTED_PARCEL_VIEW_ID',

  set_selected_parcel_view_id: (selected_parcel_view_id) => ({
    type: app_actions.SET_SELECTED_PARCEL_VIEW_ID,
    payload: { selected_parcel_view_id }
  }),

  load: () => ({
    type: app_actions.APP_LOAD
  }),

  loaded: () => ({
    type: app_actions.APP_LOADED
  })
}
