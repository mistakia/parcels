import debug from 'debug'

import server from '#root/api/index.mjs'
import config from '#config'

const logger = debug('server')
debug.enable('server,api,get_parcels_query_results')

const main = async () => {
  const { port } = config
  server.listen(port, () => logger(`API listening on port ${port}`))
}

try {
  main()
} catch (err) {
  // TODO move to stderr
  logger(err)
}
