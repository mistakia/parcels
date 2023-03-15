import debug from 'debug'
// import yargs from 'yargs'
// import { hideBin } from 'yargs/helpers'
import fetch from 'node-fetch'
import sizeof from 'object-sizeof'
import queryString from 'query-string'
import PQueue from 'p-queue'
import { open } from 'lmdb'

import db from '#db'
import config from '#config'
import {
  isMain,
  wait,
  before_shutdown,
  get_parcels_query,
  average
} from '#utils'

const get_weather_parcels_query = () => {
  const parcels_query = get_parcels_query()

  parcels_query
    .leftJoin('coordinates', function () {
      this.on('coordinates.lat', '=', 'parcels.lat').andOn(
        'coordinates.lon',
        '=',
        'parcels.lon'
      )
    })
    .whereNull('coordinates.elevation')

  parcels_query.orderByRaw('RANDOM()')
  parcels_query.limit(100)
  parcels_query.select('parcels.lat', 'parcels.lon')

  return parcels_query
}

const root_db = open({
  path: config.weather_data_path,
  // any options go here, we can turn on compression like this:
  compression: true
})
const weather_db = root_db.openDB('weather')

// const argv = yargs(hideBin(process.argv)).argv
const log = debug('import-hourly-weather')
debug.enable('import-hourly-weather')

const last_100_execution_times = []
const queue = new PQueue({ concurrency: 1 })
const import_queue = new PQueue({ concurrency: 1 })

const estimate_time_remaining = async () => {
  const coordinates_count_re = await db('coordinates').count('* as count')
  const query = get_weather_parcels_query()
  const parcels_count_re = await query.count('* as count')

  const remaining = parcels_count_re[0].count - coordinates_count_re[0].count

  if (!last_100_execution_times.length) {
    return log(`remaining ${remaining}`)
  }

  const avg_import = average(last_100_execution_times)
  log(`average import time: ${avg_import.toFixed(1)} secs`)
  log(
    `estimated time remaining: ${(
      (remaining * avg_import) /
      60 /
      60 /
      24
    ).toFixed(2)} days`
  )
}

const get_hourly_weather = async ({
  latitude,
  longitude,
  start_date = '2015-01-01',
  end_date = '2022-12-31'
}) => {
  log(`getting weather data for parcel: ${latitude},${longitude}`)
  console.time('api-response-time')
  const hourly = [
    'temperature_2m',
    'relativehumidity_2m',
    'dewpoint_2m',
    'apparent_temperature',
    'surface_pressure',
    'precipitation',
    'rain',
    'snowfall',
    'cloudcover',
    'cloudcover_low',
    'cloudcover_mid',
    'cloudcover_high',
    'shortwave_radiation',
    'direct_radiation',
    'direct_normal_irradiance',
    'diffuse_radiation',
    'windspeed_10m',
    'winddirection_10m',
    'windgusts_10m',
    'et0_fao_evapotranspiration',
    'weathercode',
    'vapor_pressure_deficit',
    'soil_temperature_0_to_7cm',
    'soil_temperature_7_to_28cm',
    'soil_temperature_28_to_100cm',
    'soil_temperature_100_to_255cm',
    'soil_moisture_0_to_7cm',
    'soil_moisture_7_to_28cm',
    'soil_moisture_28_to_100cm',
    'soil_moisture_100_to_255cm'
  ]
  const query_params = {
    latitude,
    longitude,
    start_date,
    end_date,
    hourly
  }
  const query_string = queryString.stringify(query_params, {
    arrayFormat: 'comma'
  })
  const url = `${config.weather_api_url}?${query_string}`
  const res = await fetch(url)
  const data = await res.json()
  console.timeEnd('api-response-time')
  log(`API response size: ${sizeof(data)}`)
  return data
}

const save_weather_data = ({ data, parcel }) =>
  queue.add(async () => {
    log(`saving weather data for parcel: ${parcel.lat},${parcel.lon}`)
    const key = `${parcel.lat}/${parcel.lon}`
    log(`saving to key: ${key}`)
    const location = {
      lat: parcel.lat,
      lon: parcel.lon,
      elevation: data.elevation
    }

    const hourly_inserts = []
    const wind_inserts = []
    const percipitation_inserts = []
    const soil_temperature_inserts = []
    const soil_moisture_inserts = []
    const cloudcover_inserts = []
    const radiation_inserts = []
    const humidity_inserts = []

    for (let i = 0; i < data.hourly.time.length; i++) {
      hourly_inserts.push({
        time: data.hourly.time[i],
        temperature_2m: data.hourly.temperature_2m[i],
        weathercode: data.hourly.weathercode[i],
        apparent_temperature: data.hourly.apparent_temperature[i]
      })

      humidity_inserts.push({
        relativehumidity_2m: data.hourly.relativehumidity_2m[i],
        dewpoint_2m: data.hourly.dewpoint_2m[i],
        surface_pressure: data.hourly.surface_pressure[i],
        vapor_pressure_deficit: data.hourly.vapor_pressure_deficit[i],
        et0_fao_evapotranspiration: data.hourly.et0_fao_evapotranspiration[i]
      })

      percipitation_inserts.push({
        precipitation: data.hourly.precipitation[i],
        rain: data.hourly.rain[i],
        snowfall: data.hourly.snowfall[i]
      })

      cloudcover_inserts.push({
        cloudcover: data.hourly.cloudcover[i],
        cloudcover_low: data.hourly.cloudcover_low[i],
        cloudcover_mid: data.hourly.cloudcover_mid[i],
        cloudcover_high: data.hourly.cloudcover_high[i]
      })

      radiation_inserts.push({
        shortwave_radiation: data.hourly.shortwave_radiation[i],
        direct_radiation: data.hourly.direct_radiation[i],
        direct_normal_irradiance: data.hourly.direct_normal_irradiance[i],
        diffuse_radiation: data.hourly.diffuse_radiation[i]
      })

      wind_inserts.push({
        windspeed_10m: data.hourly.windspeed_10m[i],
        winddirection_10m: data.hourly.winddirection_10m[i],
        windgusts_10m: data.hourly.windgusts_10m[i]
      })

      soil_temperature_inserts.push({
        soil_temperature_0_to_7cm: data.hourly.soil_temperature_0_to_7cm[i],
        soil_temperature_7_to_28cm: data.hourly.soil_temperature_7_to_28cm[i],
        soil_temperature_28_to_100cm:
          data.hourly.soil_temperature_28_to_100cm[i],
        soil_temperature_100_to_255cm:
          data.hourly.soil_temperature_100_to_255cm[i]
      })

      soil_moisture_inserts.push({
        soil_moisture_0_to_7cm: data.hourly.soil_moisture_0_to_7cm[i],
        soil_moisture_7_to_28cm: data.hourly.soil_moisture_7_to_28cm[i],
        soil_moisture_28_to_100cm: data.hourly.soil_moisture_28_to_100cm[i],
        soil_moisture_100_to_255cm: data.hourly.soil_moisture_100_to_255cm[i]
      })
    }

    if (hourly_inserts.length) {
      log(`inserting ${hourly_inserts.length} hourly data points`)
      weather_db.put(key, hourly_inserts)
      weather_db.put(`${key}/percipation`, percipitation_inserts)
      weather_db.put(`${key}/cloudcover`, cloudcover_inserts)
      weather_db.put(`${key}/radiation`, radiation_inserts)
      weather_db.put(`${key}/wind`, wind_inserts)
      weather_db.put(`${key}/soil_temperature`, soil_temperature_inserts)
      weather_db.put(`${key}/soil_moisture`, soil_moisture_inserts)
      await db('coordinates')
        .insert(location)
        .onConflict(['lat', 'lon'])
        .merge()
    }
  })

const populate_import_queue = async (params) => {
  if (stopped) {
    return
  }

  if (queue.size > 5) {
    await wait(1000)
    return populate_import_queue(params)
  }

  const parcels = await get_weather_parcels_query(params)

  if (!parcels.length) {
    log('found no parcels with missing data')
  }

  parcels.forEach((parcel) => import_weather_for_parcel({ parcel }))
}

let stopped = false

const import_weather_for_parcel = ({ parcel }) =>
  import_queue.add(async () => {
    if (stopped) return
    const start_time = process.hrtime.bigint()
    const throttle_timer = wait(8000)
    const hourly_weather_data = await get_hourly_weather({
      latitude: parcel.lat,
      longitude: parcel.lon
    })
    await save_weather_data({ data: hourly_weather_data, parcel })
    await throttle_timer
    const end_time = process.hrtime.bigint()
    const elapsed_time = Number(end_time - start_time) / 1000000000
    last_100_execution_times.push(elapsed_time)
    if (last_100_execution_times > 100) {
      last_100_execution_times.shift()
      estimate_time_remaining()
    }
  })

const import_hourly_weather = async () => {
  // list number of keys in weather_db
  const key_count = await weather_db.getKeysCount()
  log(`weather_db key count: ${key_count}`)

  import_queue.on('completed', async () => {
    if (import_queue.size < 2) {
      await populate_import_queue()
    }
  })

  await populate_import_queue()
  await import_queue.onIdle()
}

before_shutdown(async () => {
  stopped = true
  log(`db insert queue size: ${queue.size}`)
  await queue.onEmpty()
  await root_db.flushed
  await root_db.close()
  log('shutdown cleanup complete')
})

const main = async () => {
  let error
  try {
    await import_hourly_weather()
  } catch (err) {
    error = err
    log(error)
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

export default import_hourly_weather
