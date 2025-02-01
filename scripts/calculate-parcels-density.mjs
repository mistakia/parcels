import debug from 'debug'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import db from '#db'
import { isMain } from '#utils'

const argv = yargs(hideBin(process.argv)).argv
const log = debug('calculate-parcels-density')
debug.enable('calculate-parcels-density')

const calculate_parcels = async ({ longitude, latitude }) => {
  const point_string = `ST_SetSRID(ST_Point(${longitude}, ${latitude}), 4326)::geography`

  // Define our distance rings in kilometers
  const distances = [1, 5, 10, 25, 50]
  const result = {}

  for (const distance of distances) {
    const meters = distance * 1000
    const area = Math.PI * (meters * meters) // Area in square meters

    const query = db('parcels')
      .count('* as count')
      .whereRaw(
        `ST_DWithin(${point_string}, ST_SetSRID(ST_Point(lon, lat), 4326)::geography, ${meters})`
      )

    const [{ count }] = await query

    // Store count and density (parcels per square meter)
    result[`parcels_count_${distance}km`] = parseInt(count)
    result[`parcels_density_${distance}km`] = count / area
  }

  return result
}

const get_filtered_parcels = async () => {
  return db('parcels')
    .select('parcels.ll_uuid', 'parcels.lon', 'parcels.lat')
    .leftJoin('parcels_density', 'parcels_density.ll_uuid', 'parcels.ll_uuid')
    .whereNull('parcels_density.parcels_updated')
}

const save_parcels_density = async (inserts) => {
  await db('parcels_density').insert(inserts).onConflict('ll_uuid').merge()
  log(`inserted ${inserts.length} parcel density metrics`)
}

const calculate_parcels_for_batch = async (parcels) => {
  const timestamp = Math.round(Date.now() / 1000)
  let inserts = []
  log(`parcels missing density metrics: ${parcels.length}`)

  for (const parcel of parcels) {
    const { ll_uuid } = parcel
    const longitude = Number(parcel.lon)
    const latitude = Number(parcel.lat)
    const data = await calculate_parcels({ longitude, latitude })

    inserts.push({
      ll_uuid,
      parcels_updated: timestamp,
      ...data
    })

    if (inserts.length >= 10) {
      await save_parcels_density(inserts)
      inserts = []
    }
  }

  if (inserts.length) {
    await save_parcels_density(inserts)
  }
}

const calculate_filtered_parcels = async () => {
  const parcels = await get_filtered_parcels()
  await calculate_parcels_for_batch(parcels)
}

const main = async () => {
  let error
  try {
    if (argv.test) {
      // Test with a single point
      const longitude = -80.3517
      const latitude = 38.2242
      log('calculating density for point', { longitude, latitude })
      const result = await calculate_parcels({ longitude, latitude })
      log(result)
    } else {
      await calculate_filtered_parcels()
    }
  } catch (err) {
    error = err
    console.log(error)
  }

  process.exit()
}

if (isMain) {
  main()
}

export default calculate_parcels
