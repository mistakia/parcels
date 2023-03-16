import debug from 'debug'
import yargs from 'yargs'
import { fileURLToPath } from 'url'
import { hideBin } from 'yargs/helpers'
import { open } from 'lmdb'
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads'

import db from '#db'
import config from '#config'
import { isMain, get_parcels_query, get_sun_times } from '#utils'

const __filename = fileURLToPath(import.meta.url)
const argv = yargs(hideBin(process.argv)).argv
const log = debug('calculate-hourly-weather')
debug.enable('calculate-hourly-weather')

const root_db = open({
  path: config.weather_data_path,
  // any options go here, we can turn on compression like this:
  readOnly: true,
  compression: true
})
const weather_db = root_db.openDB('weather')

const calculate_hourly_weather = async ({ longitude, latitude }) => {
  const weather_hours = await weather_db.get(`${latitude}/${longitude}`)

  if (!weather_hours || !weather_hours.length) {
    return null
  }

  console.time('calculate_hourly_weather')

  const sun_times_cache = {
    key: null,
    value: null
  }

  const weather_data_by_year = weather_hours.reduce((acc, hour) => {
    const temp = hour.apparent_temperature_2m

    const time = new Date(hour.time)
    if (sun_times_cache.key !== time.toDateString()) {
      sun_times_cache.value = get_sun_times({ time, latitude, longitude })
    }

    const year = time.getFullYear()
    if (!acc[year]) {
      acc[year] = {
        hrs_below_0_c_apparent_temperature: 0,
        hrs_below_5_c_apparent_temperature: 0,
        hrs_below_10_c_apparent_temperature: 0,

        daytime_hrs_below_0_c_apparent_temperature: 0,
        daytime_hrs_below_5_c_apparent_temperature: 0,
        daytime_hrs_below_10_c_apparent_temperature: 0
      }
    }

    if (temp < 0) {
      acc[year].hrs_below_0_c_apparent_temperature += 1

      if (
        hour.time > sun_times_cache.value.dawn &&
        hour.time < sun_times_cache.value.dusk
      ) {
        acc[year].daytime_hrs_below_0_c_apparent_temperature += 1
      }
    } else if (temp < 5) {
      acc[year].hrs_below_5_c_apparent_temperature += 1

      if (
        hour.time > sun_times_cache.value.dawn &&
        hour.time < sun_times_cache.value.dusk
      ) {
        acc[year].daytime_hrs_below_5_c_apparent_temperature += 1
      }
    } else if (temp < 10) {
      acc[year].hrs_below_10_c_apparent_temperature += 1

      if (
        hour.time > sun_times_cache.value.dawn &&
        hour.time < sun_times_cache.value.dusk
      ) {
        acc[year].daytime_hrs_below_10_c_apparent_temperature += 1
      }
    }

    return acc
  }, {})

  const return_data = Object.keys(weather_data_by_year).reduce((acc, year) => {
    const year_data = weather_data_by_year[year]
    for (const key in year_data) {
      acc[`${key}_in_${year}`] = year_data[key]
    }
    return acc
  }, {})

  console.timeEnd('calculate_hourly_weather')

  return return_data
}

const get_filtered_parcels = async () => {
  const parcels_query = get_parcels_query()
  parcels_query.select('parcels.ll_uuid', 'parcels.lon', 'parcels.lat')
  parcels_query.join('coordinates', function () {
    this.on('coordinates.lat', '=', 'parcels.lat')
    this.andOn('coordinates.lon', '=', 'parcels.lon')
  })

  parcels_query
    .leftJoin('parcels_weather', 'parcels_weather.ll_uuid', 'parcels.ll_uuid')
    .whereNull('parcels_weather.updated')

  parcels_query.limit(100)

  return parcels_query
}

const save_hourly_weather = async (inserts) => {
  await db('parcels_weather').insert(inserts).onConflict('ll_uuid').merge()
  log(`inserted ${inserts.length} parcel hourly weather metrics`)
}

const calculate_hourly_weather_for_parcels = async (parcels) => {
  const timestamp = Math.round(Date.now() / 1000)
  const inserts = []
  log(`parcels missing hourly weather: ${parcels.length}`)
  for (const parcel of parcels) {
    const { ll_uuid } = parcel
    const longitude = Number(parcel.lon)
    const latitude = Number(parcel.lat)
    const data = await calculate_hourly_weather({ longitude, latitude })

    if (!data) {
      continue
    }

    inserts.push({
      ll_uuid,
      updated: timestamp,
      ...data
    })
  }

  return inserts
}

const calculate_filtered_parcels = async () => {
  const parcels = await get_filtered_parcels()
  const numThreads = 4 // Set number of threads
  const chunkSize = Math.ceil(parcels.length / numThreads) // Determine chunk size

  const workerPromises = []
  for (let i = 0; i < numThreads; i++) {
    const start = i * chunkSize
    const end = start + chunkSize
    const chunk = parcels.slice(start, end)

    const worker = new Worker(__filename, {
      workerData: chunk
    })

    workerPromises.push(
      new Promise((resolve, reject) => {
        worker.on('message', resolve)
        worker.on('error', reject)
        worker.on('exit', (code) => {
          if (code !== 0) {
            reject(new Error(`Worker stopped with exit code ${code}`))
          }
        })
      })
    )
  }

  const results = await Promise.all(workerPromises)
  const inserts = results.flat()

  if (inserts.length) {
    await save_hourly_weather(inserts)
  }

  if (parcels.length === 100) {
    await calculate_filtered_parcels()
  }
}

export default calculate_hourly_weather

const main = async () => {
  if (isMainThread) {
    let error
    try {
      if (argv.parcels) {
        await calculate_filtered_parcels()
      } else {
        const longitude = -80.3517
        const latitude = 38.2242

        await calculate_hourly_weather({ longitude, latitude })
      }
    } catch (err) {
      error = err
      console.log(error)
    }
  } else {
    const parcels = workerData
    const results = await calculate_hourly_weather_for_parcels(parcels)
    parentPort.postMessage(results)
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
