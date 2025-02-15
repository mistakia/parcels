import https from 'https'
import http from 'http'
import fs, { promises as fsPromise } from 'fs'
import url, { fileURLToPath } from 'url'
import path, { dirname } from 'path'

import express from 'express'
import morgan from 'morgan-debug'
import extend from 'deep-extend'
import bodyParser from 'body-parser'
import compression from 'compression'
import debug from 'debug'
import serveStatic from 'serve-static'
import cors from 'cors'
import favicon from 'express-favicon'
import robots from 'express-robots-txt'

import config from '#config'
import db from '#db'
import routes from '#root/api/routes/index.mjs'
import cache from '#root/api/cache.mjs'
import wss from '#root/api/websocket.mjs'

const log = debug('api')
const defaults = {}
const options = extend(defaults, config)
const IS_DEV = process.env.NODE_ENV === 'development'
const __dirname = dirname(fileURLToPath(import.meta.url))
const api = express()

api.locals.db = db
api.locals.log = log
api.locals.cache = cache

api.enable('etag')
api.disable('x-powered-by')
api.use(compression())
api.use(morgan('api', 'combined'))
api.use(bodyParser.json())
api.use(
  cors({
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
  })
)

api.use(robots(path.join(__dirname, '..', 'resources', 'robots.txt')))
api.use(favicon(path.join(__dirname, '..', 'resources', 'favicon.ico')))
api.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', req.headers.origin || config.url)
  res.set('Access-Control-Allow-Credentials', 'true')
  res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS, PUT')
  res.set(
    'Access-Control-Allow-Headers',
    'Authorization, Origin, X-Requested-With, Content-Type, Accept'
  )
  res.set('Cache-Control', 'no-cache, must-revalidate, proxy-revalidate')
  res.set('Expires', '0')
  res.set('Pragma', 'no-cache')
  res.set('Surrogate-Control', 'no-store')
  next()
})

const resourcesPath = path.join(__dirname, '..', 'resources')
api.use('/resources', serveStatic(resourcesPath))
const dataPath = path.join(__dirname, '..', 'data')
api.use('/data', serveStatic(dataPath))
api.use('/api/parcels', routes.parcels)
api.use('/api/views', routes.views)
api.use('/api/heatmaps', routes.heatmap)

if (IS_DEV) {
  api.get('*', (req, res) => {
    res.redirect(307, `http://localhost:8082${req.path}`)
  })
} else {
  const buildPath = path.join(__dirname, '..', 'build')
  api.use('/', async (req, res, next) => {
    const filepath = req.url.replace(/\/$/, '')
    const filename = `${filepath}/index.html`
    const fullpath = path.join(buildPath, filename)
    try {
      const filestat = await fsPromise.stat(fullpath)
      if (filestat.isFile()) {
        return res.sendFile(fullpath, { cacheControl: false })
      }
      next()
    } catch (error) {
      log(error)
      next()
    }
  })
  api.use('/', serveStatic(buildPath))
  api.get('*', (req, res) => {
    const notFoundPath = path.join(__dirname, '../', 'build', '404.html')
    res.sendFile(notFoundPath, { cacheControl: false })
  })

  // redirect to ipfs page
  // res.redirect(307, `${config.url}${req.path}`)
}

const createServer = () => {
  if (!options.ssl) {
    return http.createServer(api)
  }

  const sslOptions = {
    key: fs.readFileSync(config.key),
    cert: fs.readFileSync(config.cert)
  }
  return https.createServer(sslOptions, api)
}

const server = createServer()

server.on('upgrade', async (request, socket, head) => {
  const parsed = new url.URL(request.url, config.url)
  try {
    const public_key = parsed.searchParams.get('public_key')
    request.user = { public_key }
  } catch (error) {
    log(error)
    return socket.destroy()
  }

  wss.handleUpgrade(request, socket, head, function (ws) {
    ws.public_key = request.user.public_key
    log(`websocket connected: ${ws.public_key}`)
    wss.emit('connection', ws, request)
  })
})

export default server
