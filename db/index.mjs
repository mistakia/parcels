import Knex from 'knex'
import config from '#config'

const parcels_db = Knex(config.parcels_db)

const osm_db = Knex(config.osm_db)

export { osm_db }

export default parcels_db
