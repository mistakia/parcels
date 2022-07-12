import { fileURLToPath } from 'url'
import fs from 'fs-extra'
import path, { dirname } from 'path'
import { fetch, CookieJar } from 'node-fetch-cookies'

const __dirname = dirname(fileURLToPath(import.meta.url))
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
