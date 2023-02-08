import Knex from 'knex'
import config from '../config.js'

const mysql = Knex(config.mysql)

const postgres = Knex(config.postgres)

export { postgres }

export default mysql
