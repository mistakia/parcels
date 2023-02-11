import debug from 'debug'
import yargs from 'yargs'
import fetch from 'node-fetch'
import { hideBin } from 'yargs/helpers'

import db from '#db'
import config from '#config'
import { isMain, get_parcels_query, wait } from '#common'

const argv = yargs(hideBin(process.argv)).argv
const log = debug('import-nature-score')
debug.enable('import-nature-score')

const get_nature_score_for_parcel = async ({ longitude, latitude }) => {
  const url = `${config.nature_api_url}?latitude=${latitude}&longitude=${longitude}`
  const res = await fetch(url, {
    headers: {
      'x-api-key': config.nature_api_key
    }
  })
  const data = await res.json()
  return {
    nature_score: data.score,
    leaf_rating: data.leaf_rating.rating
  }
}

const save_nature_score = async (inserts) => {
  await db('parcels_nature').insert(inserts).onConflict().merge()
  log(`inserted ${inserts.length} parcel nature scores`)
}

const import_nature_score_for_parcels = async (parcels) => {
  log(`parcels missing nature scores: ${parcels.length}`)
  const timestamp = Math.round(Date.now() / 1000)
  let inserts = []
  for (const parcel of parcels) {
    const { lon: longitude, lat: latitude, path } = parcel
    let res
    try {
      res = await get_nature_score_for_parcel({ longitude, latitude })
      await wait(5000)
    } catch (err) {
      log(err)
    }

    if (res && res.score) {
      inserts.push({
        path,
        nature_updated: timestamp,
        ...res
      })
    }

    if (inserts.length >= 1) {
      await save_nature_score(inserts)
      inserts = []
    }
  }

  if (inserts.length) {
    await save_nature_score(inserts)
  }
}

const get_filtered_nature_parcels = async () => {
  const parcels_query = get_parcels_query()
  parcels_query.select('parcels.path', 'parcels.lon', 'parcels.lat')

  parcels_query
    .leftJoin('parcels_nature', 'parcels_nature.path', 'parcels.path')
    .whereNull('parcels_nature.nature_updated')

  parcels_query.limit(1000)

  return parcels_query
}

const import_nature_score_for_filtered_parcels = async () => {
  const parcels = await get_filtered_nature_parcels()
  await import_nature_score_for_parcels(parcels)
}

export default get_nature_score_for_parcel

const main = async () => {
  let error
  try {
    if (argv.parcels) {
      await import_nature_score_for_filtered_parcels()
    } else {
      const longitude = argv.lon || -80.3517
      const latitude = argv.lat || 38.2242

      const data = await get_nature_score_for_parcel({ longitude, latitude })
      log(data)
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
