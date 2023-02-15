export const appActions = {
  APP_LOAD: 'APP_LOAD',
  APP_LOADED: 'APP_LOADED',

  load: () => ({
    type: appActions.APP_LOAD
  }),

  loaded: () => ({
    type: appActions.APP_LOADED
  })
}
