import debug from 'debug'
import fetch from 'node-fetch'
import path from 'path'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import db from '#db'
import config from '#config'
import { isMain, wait, USER_AGENT } from '#utils'

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
      'User-Agent': USER_AGENT
    }
  })
  const data = await response.json()
  return data
}

export const getProperties = async (path = '/us') => {
  log(`getting properties for ${path}`)
  try {
    const url = `${config.import_base_url}${path}/boundaries.json`
    const response = await fetch(url, {
      headers: {
        'User-Agent': USER_AGENT
      }
    })
    const data = await response.json()

    if (data.children.none) {
      return []
    }

    let features = []

    if (data.children.admin) {
      features = features.concat(data.children.admin.geojson.features)
    }

    if (data.children.neighborhoods) {
      features = features.concat(data.children.neighborhoods.geojson.features)
    }

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

export const savePropertyStats = async (property) => {
  const stats = await getStats(property.path)
  await db('properties')
    .insert(formatProperty({ stats, property }))
    .onConflict('path')
    .merge()
}

const importProperty = async (property) => {
  log(`importing property ${property.path}`)
  await savePropertyStats(property)

  const sub_properties = await getProperties(property.path)
  for (property of sub_properties) {
    await importProperty(property)
    await wait(5000)
  }
}

const importProperties = async ({ property_path = '/us', start } = {}) => {
  const properties_a = await getProperties(path.dirname(property_path))
  const property = properties_a.find((p) => p.path === property_path)
  if (property) {
    await savePropertyStats(property)
  }
  let properties = await getProperties(property_path)

  if (start) {
    const index = properties.findIndex((p) => p.path === start)
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
    await importProperties({ property_path: argv.path, start: argv.start })
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

if (isMain(import.meta.url)) {
  main()
}
