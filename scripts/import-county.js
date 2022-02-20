import debug from 'debug'
import yargs from 'yargs'
import queryString from 'query-string'
import { hideBin } from 'yargs/helpers'

import db from '../db/index.js'
import config from '../config.js'
import { isMain, request, wait } from '../common/index.js'

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

  log({ county, page })

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
    return
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

const run = async ({ county }) => {
  const columns = Object.keys(await db('parcels').columnInfo())
  log(`importing parcels for ${county}`)

  let page = 1
  let res
  do {
    res = await requestParcels({ county, columns, page })

    if (res) {
      page += 1
    }

    await wait(3000)
  } while (res && res.offset < res.count - 200)
}

export default run

const main = async () => {
  let error
  try {
    if (!argv.county) {
      console.log('missing --county path')
      process.exit()
    }
    await run({ county: argv.county })
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
