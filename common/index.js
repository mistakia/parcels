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
