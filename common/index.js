import { fileURLToPath } from 'url'
import fs from 'fs-extra'
import path, { dirname } from 'path'
import { fetch, CookieJar } from 'node-fetch-cookies'

import db from '#db'

export { default as before_shutdown } from './before-shutdown.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
export const data_path = path.resolve(__dirname, '../data')
export const lmdb_data_path = path.resolve(__dirname, '../lmdb-data')
const jarPath = path.resolve(__dirname, '../jar.json')
if (!fs.pathExistsSync(jarPath)) {
  fs.writeJsonSync(jarPath, [{}])
}
const cookieJar = new CookieJar(jarPath)

export const request = async ({ url, ...options }) => {
  await cookieJar.load()

  const response = await fetch(cookieJar, url, options)

  if (response.status >= 200 && response.status < 300) {
    await cookieJar.save()
    return response.json()
  } else {
    const res = await response.json()
    const error = new Error(res.error || response.statusText)
    error.response = response
    throw error
  }
}

export const isMain = (p) => process.argv[1] === fileURLToPath(p)
export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
export const getParcelCount = async (path) => {
  const re = await db('parcels')
    .where('path', 'like', `${path}%`)
    .count('* as count')
  return re[0].count
}
export const getProperty = async (path) => {
  const re = await db('properties').where({ path })
  return re[0]
}

export const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36'

export const get_parcels_query = ({ min_acre = 5 } = {}) => {
  const parcels_query = db('parcels')

  parcels_query.where('parcels.gisacre', '>=', min_acre)

  const ownership_desc = [
    'No constraints — private ownership',
    'Public restrictions'
  ]
  parcels_query.whereIn('parcels.lbcs_ownership_desc', ownership_desc)

  return parcels_query
}
