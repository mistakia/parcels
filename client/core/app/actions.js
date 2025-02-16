export const app_actions = {
  APP_LOAD: 'APP_LOAD',
  APP_LOADED: 'APP_LOADED',

  SET_SELECTED_PARCEL_VIEW_ID: 'SET_SELECTED_PARCEL_VIEW_ID',
  SET_SELECTED_PARCEL: 'SET_SELECTED_PARCEL',

  LOAD_FROM_NEW_KEYPAIR: 'LOAD_FROM_NEW_KEYPAIR',
  LOAD_FROM_PRIVATE_KEY: 'LOAD_FROM_PRIVATE_KEY',
  LOAD_KEYS: 'LOAD_KEYS',

  set_selected_parcel_view_id: (selected_parcel_view_id) => ({
    type: app_actions.SET_SELECTED_PARCEL_VIEW_ID,
    payload: { selected_parcel_view_id }
  }),

  load: () => ({
    type: app_actions.APP_LOAD
  }),

  loaded: () => ({
    type: app_actions.APP_LOADED
  }),

  load_keys: ({ public_key, private_key }) => ({
    type: app_actions.LOAD_KEYS,
    payload: {
      public_key,
      private_key
    }
  }),

  load_from_new_keypair: ({ public_key, private_key }) => ({
    type: app_actions.LOAD_FROM_NEW_KEYPAIR,
    payload: {
      public_key,
      private_key
    }
  }),

  load_from_private_key: ({ public_key, private_key }) => ({
    type: app_actions.LOAD_FROM_PRIVATE_KEY,
    payload: {
      public_key,
      private_key
    }
  }),

  set_selected_parcel: ({ ll_uuid }) => ({
    type: app_actions.SET_SELECTED_PARCEL,
    payload: { ll_uuid }
  })
}
