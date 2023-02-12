import debug from 'debug'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import GeojsonFlatbush from 'geojson-flatbush'
import * as turf from '@turf/turf'

import db from '#db'
// import config from '#config'
import {
  isMain,
  get_parcels_query,
  group_by,
  get_parcel_polygon
} from '#common'

const argv = yargs(hideBin(process.argv)).argv
const log = debug('calculate-plant-hardiness')
debug.enable('calculate-plant-hardiness')

const get_state_from_path = (path) => path.split('/')[2].toUpperCase()

const calculate_plant_hardiness = async ({ longitude, latitude, state }) => {}

const get_filtered_plant_hardiness_parcels = async () => {
  const parcels_query = get_parcels_query()
  parcels_query.select('parcels.path', 'parcels.lon', 'parcels.lat')

  parcels_query
    .leftJoin('parcels_agriculture', 'parcels_agriculture.path', 'parcels.path')
    .whereNull('parcels_agriculture.plant_hardiness_updated')

  return parcels_query
}

const save_plant_hardiness = async (inserts) => {
  await db('parcels_agriculture').insert(inserts).onConflict().merge()
  log(`inserted ${inserts.length} parcel plant_hardiness metrics`)
}

const calculate_plant_hardiness_for_parcels = async (parcels) => {
  const plant_hardiness_zones = await db('plant_hardiness_zones')
  log(`loaded ${plant_hardiness_zones.length} plant hardiness zone polygons`)

  const plant_hardiness_zones_by_state = group_by(
    plant_hardiness_zones,
    'stusps'
  )

  const indexes = {}

  for (const us_state in plant_hardiness_zones_by_state) {
    const items = plant_hardiness_zones_by_state[us_state]
    const index = new GeojsonFlatbush(items.length)

    const features = items.map((item) => {
      const { coordinates, ...rest } = item
      return get_parcel_polygon(coordinates, rest)
    })
    const collection = turf.featureCollection(features)

    index.load(collection)
    index.finish()

    indexes[us_state] = {
      index,
      collection
    }
    log(`built index for ${us_state}`)
  }

  const timestamp = Math.round(Date.now() / 1000)
  let inserts = []
  log(`parcels missing plant_hardiness: ${parcels.length}`)
  for (const parcel of parcels) {
    const { path } = parcel
    const state = get_state_from_path(path)
    const longitude = Number(parcel.lon)
    const latitude = Number(parcel.lat)
    const { index, collection } = indexes[state]
    const point = turf.point([longitude, latitude])
    const features = index.search(point, collection)
    const first_result = features.features[0]

    if (first_result) {
      const insert = {
        path,
        plant_hardiness_updated: timestamp,
        hardiness_zone: first_result.properties.zone,
        hardiness_temp: first_result.properties.temp
      }
      inserts.push(insert)
    } else {
      log(`no result for: ${path}/${longitude},${latitude}`)
    }

    if (inserts.length >= 100) {
      await save_plant_hardiness(inserts)
      inserts = []
    }
  }

  if (inserts.length) {
    await save_plant_hardiness(inserts)
  }
}

const calculate_filtered_plant_hardiness_parcels = async () => {
  const parcels = await get_filtered_plant_hardiness_parcels()
  await calculate_plant_hardiness_for_parcels(parcels)
}

export default calculate_plant_hardiness

const main = async () => {
  let error
  try {
    if (argv.parcels) {
      await calculate_filtered_plant_hardiness_parcels()
    } else {
      const longitude = -80.3517
      const latitude = 38.2242
      const state = 'VA'

      await calculate_plant_hardiness({ longitude, latitude, state })
    }
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
