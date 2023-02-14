import fetch from 'node-fetch'

import config from '#config'

export default async function () {
  const res = await fetch(config.proxy_urls_api)
  const { data } = await res.json()
  return data.map(p => `${p.protocols[0]}://${p.ip}:${p.port}`)
}
