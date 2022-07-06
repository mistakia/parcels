import debug from 'debug'
import fetch from 'node-fetch'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import db from '../db/index.js'
import config from '../config.js'
import { isMain, wait } from '../common/index.js'

const argv = yargs(hideBin(process.argv)).argv
const log = debug('import-properties')
debug.enable('import-properties')

const formatProperty = ({ stats, property }) => ({
  sqmi: stats.numeric.sqmi,
  num_parcels: stats.numeric.num_parcels,
  num_owners: stats.numeric.num_owners,
  ogc_fid: property.ogc_fid,
  name: property.name,
  postal: property.postal,
  classes: property.classes,
  headline: property.headline,
  path: property.path
})

const getStats = async (path = '/us') => {
  log(`getting stats for ${path}`)
  const url = `${config.import_base_url}${path}/stats.json`
  const response = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36'
    }
  })
  const data = await response.json()
  return data
}

const getProperties = async (path = '/us') => {
  log(`getting properties for ${path}`)
  try {
    const url = `${config.import_base_url}${path}/boundaries.json`
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36'
      }
    })
    const data = await response.json()

    if (data.children.none) {
      return []
    }

    const { features } = data.children.admin.geojson

    const properties = []
    for (const feature of features) {
      properties.push(feature.properties)
    }

    return properties
  } catch (err) {
    log(err)
    return []
  }
}

const importProperty = async (property) => {
  log(`importing property ${property.path}`)
  const stats = await getStats(property.path)
  await db('properties')
    .insert(formatProperty({ stats, property }))
    .onConflict()
    .merge()

  const sub_properties = await getProperties(property.path)
  for (property of sub_properties) {
    await importProperty(property)
    await wait(5000)
  }
}

const importProperties = async ({ path = '/us', start } = {}) => {
  let properties = await getProperties(path)

  if (start) {
    const index = properties.findIndex(p => p.path === start)
    properties = properties.slice(index)
  }

  for (const property of properties) {
    await importProperty(property)
    await wait(5000)
  }
}

export default importProperties

const main = async () => {
  let error
  try {
    await importProperties({ path: argv.path, start: argv.start })
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
