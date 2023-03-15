import debug from 'debug'
import fs from 'fs-extra'
import path from 'path'
import * as turf from '@turf/turf'
// import yargs from 'yargs'
// import { hideBin } from 'yargs/helpers'

import db from '#db'
// import config from '#config'
import { isMain, data_path } from '#utils'

// const argv = yargs(hideBin(process.argv)).argv
const log = debug('import-airports')
debug.enable('import-airports')

const format_airport = ({
  type,
  name,
  abbrev,
  gps_code,
  iata_code,
  wikipedia
}) => ({
  type,
  name,
  abbrev,
  gps_code,
  iata_code,
  wikipedia
})

const import_airports = async () => {
  const airport_geojson = fs.readJsonSync(
    path.resolve(data_path, './airports.geo.json')
  )

  const inserts = []
  turf.featureEach(airport_geojson, (airport) => {
    inserts.push({
      latitude: airport.geometry.coordinates[1],
      longitude: airport.geometry.coordinates[0],
      ...format_airport(airport.properties)
    })
  })

  await db('airports').insert(inserts).onConflict('abbrev').merge()
  log(`inserted ${inserts.length} airports`)
}

export default import_airports

const main = async () => {
  let error
  try {
    await import_airports()
  } catch (err) {
    error = err
    console.log(error)
  }

  /* await db('jobs').insert({
   *   type: constants.jobs.EXAMPLE,
   *   succ: error ? 0 : 1,
   *   reason: error ? error.message : null,
   *   timestamp: Math.round(Date.now() / 1000)
   * })
   */
  process.exit()
}

if (isMain) {
  main()
}
