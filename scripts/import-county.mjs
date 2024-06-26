import debug from 'debug'
import yargs from 'yargs'
import qs from 'qs'
import { hideBin } from 'yargs/helpers'

import db from '#db'
import config from '#config'
import {
  isMain,
  request,
  wait,
  getProperty,
  getParcelCount,
  USER_AGENT
} from '#utils'

const argv = yargs(hideBin(process.argv)).argv
const log = debug('import-county')
debug.enable('import-county')

const requestParcels = async ({ county, columns, page }) => {
  const params = {
    style: 'table',
    query: JSON.stringify({
      operation: 'union',
      page,
      path: county
    })
  }
  const query = qs.stringify(params)
  const url = `${config.import_base_url}${county}/blexts.json?${query}`

  const now = new Date()
  const offsetMs = now.getTimezoneOffset() * 60 * 1000
  const dateLocal = new Date(now.getTime() - offsetMs)
  const date = dateLocal
    .toISOString()
    .slice(0, 19)
    .replace(/-/g, '/')
    .replace('T', ' - ')

  log({ county, page, date })

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
  }

  if (!res) {
    return false
  }

  const parcels = []

  // const missing = Object.keys(res.table[0].parcel).filter((k) => !columns.includes(k))
  // console.log(missing)

  for (const item of res.table) {
    const selected = Object.fromEntries(
      Object.entries(item.parcel).filter(([k, v]) => columns.includes(k))
    )
    selected.ogc_fid = item.fid
    parcels.push(selected)
  }

  if (parcels.length) {
    log(`saving ${parcels.length} parcels`)
    await db('parcels').insert(parcels).onConflict('ll_uuid').merge()
  }

  return res
}

const importCounty = async ({ county, start = 1, end = Infinity }) => {
  const column_results = await db('information_schema.columns')
    .select('column_name')
    .where('table_name', 'parcels')
  const columns = column_results.map((r) => r.column_name)
  log(`importing parcels for ${county}, start ${start}`)

  const property = await getProperty(county)

  let page = start
  let res
  do {
    res = null
    res = await requestParcels({ county, columns, page })

    const count = await getParcelCount(county)
    if (count >= property.num_parcels) {
      log('all parcels imported')
      return true
    }

    if (res) {
      page += 1

      await db('properties')
        .update({
          import_cursor: page
        })
        .where({
          path: county
        })
    }

    await wait(10000)
  } while (res && res.offset < res.count - 200 && page < end)

  return Boolean(res)
}

export default importCounty

const main = async () => {
  let error
  try {
    if (!argv.county) {
      console.log('missing --county path')
      process.exit()
    }
    await importCounty({
      county: argv.county,
      start: argv.start,
      end: argv.end
    })
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
