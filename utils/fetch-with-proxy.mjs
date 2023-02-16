import fetch from 'node-fetch'
import ProxyAgent from 'simple-proxy-agent'

export default async function ({ proxy_url, url, options = {} } = {}) {
  options = {
    agent: new ProxyAgent(proxy_url),
    ...options
  }
  const response = await fetch(url, options)

  return response.json()
}
