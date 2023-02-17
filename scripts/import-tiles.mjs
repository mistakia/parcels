import debug from 'debug'
import extend from 'deep-extend'
import path from 'path'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import cover from '@mapbox/tile-cover'
import fs from 'fs-extra'

import db from '#db'
import config from '#config'
import {
  isMain,
  request,
  USER_AGENT,
  wait,
  get_parcel,
  get_importer_data,
  before_shutdown,
  data_path
} from '#utils'

const argv = yargs(hideBin(process.argv)).argv
const log = debug('import_parcel_geometry')
debug.enable('import_parcel_geometry')

const get_tiles_set = (...arrays) => {
  const uniqueXYZ = new Set()
  arrays.forEach((array) => {
    array.forEach((values) => {
      const [x, y, z] = values
      uniqueXYZ.add(`${x},${y},${z}`)
    })
  })
  return uniqueXYZ
}

const import_tile = async ({ x, y, z = 12 }) => {
  const url = `${config.import_tile_url}/${z}/${x}/${y}.json`
  log(url)
  let res
  try {
    res = await request({
      url,
      headers: {
        'User-Agent': USER_AGENT,
        cookie: config.cookie
      }
    })
  } catch (err) {
    log(err)
    if (err.message.includes('invalid json response body')) {
      await db('tiles').insert({ x, y, z, count: 0 }).onConflict().merge()
      return true
    }
  }

  if (!res) {
    return false
  }

  if (!res.data) {
    return false
  }

  // log(res.data)

  const items = Object.values(res.data).map(({ geojson, fid, ...rest }) => ({
    ...rest,
    coordinates: JSON.parse(geojson).coordinates
  }))

  const parcels_geometry_inserts = []
  const parcels_geometry_extra_inserts = []

  for (const { coordinates, ...rest } of items) {
    const parcel = await get_parcel(rest)
    const coordinates_s = JSON.stringify(coordinates)

    if (parcel) {
      parcels_geometry_inserts.push({
        ll_uuid: parcel.ll_uuid,
        coordinates: coordinates_s
      })
    } else {
      parcels_geometry_extra_inserts.push({
        ...rest,
        coordinates: coordinates_s
      })
    }
  }

  if (parcels_geometry_inserts.length) {
    await db('parcels_geometry')
      .insert(parcels_geometry_inserts)
      .onConflict()
      .merge()
    log(`saved ${parcels_geometry_inserts.length} parcel geometry`)
  }

  if (parcels_geometry_extra_inserts.length) {
    await db('parcels_geometry_extra')
      .insert(parcels_geometry_extra_inserts)
      .onConflict()
      .merge()

    log(`saved ${parcels_geometry_extra_inserts.length} parcel geometry extra`)
  }

  await db('tiles')
    .insert({ x, y, z, count: items.length })
    .onConflict()
    .merge()

  log(`imported data for tile ${z}/${x}/${y}`)
  return true
}

const importer = async () => {
  const import_data = await get_importer_data('tiles')
  const defaults = {
    min_x: 626,
    max_x: 1289,
    min_y: 1405,
    max_y: 1760
  }
  const options = extend(defaults, import_data ? import_data.data : {})
  let x = options.x || options.min_x
  let y = options.y || options.min_y
  const z = 12

  log(options)
  log({ x, y, z })

  const us_outline_feature_collection = fs.readJsonSync(
    path.resolve(data_path, './us_continental_counties_500k.geo.json')
  )
  const limits = { min_zoom: 12, max_zoom: 12 }
  const tiles = us_outline_feature_collection.features.map((p) =>
    cover.tiles(p.geometry, limits)
  )
  const tiles_set = get_tiles_set(...tiles)

  const exit = async (error) => {
    if (error) {
      log(error)
    }

    await db('importers')
      .insert({
        name: 'tiles',
        timestamp: Math.round(Date.now() / 1000),
        last_error: error,
        data: JSON.stringify({
          ...options,
          x,
          y
        })
      })
      .onConflict()
      .merge()
    log('saved importer status')
  }

  before_shutdown(async () => {
    await exit()
    log('shutdown cleanup complete')
  })

  let error

  try {
    for (; x <= options.max_x; x++) {
      y = options.min_y

      for (; y <= options.max_y; y++) {
        const key = `${x},${y},${z}`
        if (!tiles_set.has(key)) {
          continue
        }
        const res = await import_tile({ x, y, z })
        await wait(10000)
        if (!res) {
          await exit('unable to retrieve tile, exiting')
          process.exit()
        }
      }
    }
  } catch (err) {
    log(err)
    error = err
  }

  await exit(error ? error.message : null)
}

export default importer

const main = async () => {
  let error
  try {
    if (argv.x && argv.y) {
      await import_tile({ x: argv.x, y: argv.y })
    } else {
      await importer()
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
