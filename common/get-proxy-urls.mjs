import fetch from 'node-fetch'

import config from '#config'

export default async function () {
  const res = await fetch(config.proxy_urls_api)
  const json = await res.json()
  return json.data
}
