import debug from 'debug'
import yargs from 'yargs'
import queryString from 'query-string'
import { hideBin } from 'yargs/helpers'

import db from '../db/index.js'
import config from '../config.js'
import {
  isMain,
  request,
  wait,
  getProperty,
  getParcelCount
} from '../common/index.js'

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
  const qs = queryString.stringify(params)
  const url = `${config.import_base_url}${county}/blexts.json?${qs}`

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
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36',
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
    await db('parcels').insert(parcels).onConflict().merge()
  }

  return res
}

const importCounty = async ({ county, start = 1, end = Infinity }) => {
  const columns = Object.keys(await db('parcels').columnInfo())
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
