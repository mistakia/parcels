import debug from 'debug'
import yargs from 'yargs'
import fs from 'fs-extra'
import path from 'path'
import { hideBin } from 'yargs/helpers'

import db from '#db'
// import config from '#config'
import { isMain } from '#common'

const argv = yargs(hideBin(process.argv)).argv
const log = debug('import-plant-hardiness')
debug.enable('import-plant-hardiness')

// missing HI, AK, and PR
const us_states = [
  'AL',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DC',
  'DE',
  'FL',
  'GA',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY'
]

const import_plant_hardiness = async ({ ophz_dir_path }) => {
  for (const state of us_states) {
    const inserts = []
    const file_geojson = fs.readJsonSync(
      path.resolve(ophz_dir_path, `./geojson/ophz_${state}.geojson`)
    )

    for (const feature of file_geojson.features) {
      const {
        ZONE: zone,
        TEMP: temp,
        NAME: state,
        STUSPS: stusps,
        STATEFP: statefp
      } = feature.properties
      inserts.push({
        zone,
        temp,
        state,
        stusps,
        statefp,
        coordinates: JSON.stringify(feature.geometry.coordinates)
      })
    }

    await db('plant_hardiness_zones').insert(inserts)
    log(`inserted ${inserts.length} hardiness zones for ${state}`)
  }
}

export default import_plant_hardiness

const main = async () => {
  let error
  try {
    await import_plant_hardiness({ ophz_dir_path: argv.path })
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
