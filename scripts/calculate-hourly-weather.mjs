import debug from 'debug'
import yargs from 'yargs'
import { fileURLToPath } from 'url'
import { hideBin } from 'yargs/helpers'
import { open } from 'lmdb'
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads'
import suncalc from 'suncalc'
import { find } from 'geo-tz'

import db from '#db'
import config from '#config'
import { isMain, get_parcels_query } from '#utils'

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
  const key = `${latitude}/${longitude}`
  const weather_hours = await weather_db.get(key)
  const cloudcover_weather_hours = await weather_db.get(`${key}/cloudcover`)
  const wind_weather_hours = await weather_db.get(`${key}/wind`)

  // TODO: fix typo in db, move to `percipitation`
  const percipitation_hours = await weather_db.get(`${key}/percipation`)

  // get timezone from coordinates
  const tz = find(latitude, longitude)[0]

  if (
    !weather_hours ||
    !weather_hours.length ||
    !cloudcover_weather_hours ||
    !cloudcover_weather_hours.length ||
    !wind_weather_hours ||
    !wind_weather_hours.length
  ) {
    return null
  }

  console.time('calculate_hourly_weather')

  const sun_times_cache = {
    key: null,
    value: null
  }

  // used to prevent calculating cloud cover for the same day multiple times
  const cache = {
    at_least_5_hours_with_cloud_cover_under_55: {},
    at_least_5_hours_with_cloud_cover_under_75: {},
    indoor_days: {}
  }

  const weather_data_by_year = weather_hours.reduce(
    (acc, weather_hour, index) => {
      const temp = weather_hour.apparent_temperature
      const cloudcover = cloudcover_weather_hours[index].cloudcover
      const wind_speed = wind_weather_hours[index].windspeed_10m

      // convert iso8601 GMT+0 time to local time based on longitude, latitude
      const time = new Date(weather_hour.time)
      const local_time_string = time.toLocaleString('en-US', {
        timeZone: tz
      })
      const local_time = new Date(local_time_string)
      const year = local_time.getFullYear()
      const hour = local_time.getHours()

      // hardcoded fix for timezone adjustment resulting in a few hours of 2014 data
      if (year === 2014) {
        return acc
      }

      const local_time_date_string = local_time.toISOString().slice(0, 10)
      if (sun_times_cache.key !== local_time_date_string) {
        sun_times_cache.value = suncalc.getTimes(
          local_time,
          latitude,
          longitude
        )
      }

      // initialize accumulator for year
      if (!acc[year]) {
        acc[year] = {
          dates: {
            fair_days: {},
            perfect_days: {},
            active_days: {},
            dinner_outside_days: {},
            indoor_days: {}
          },

          hrs_below_0_c_apparent_temperature: 0,
          hrs_below_5_c_apparent_temperature: 0,
          hrs_below_10_c_apparent_temperature: 0,

          daytime_hrs_below_0_c_apparent_temperature: 0,
          daytime_hrs_below_5_c_apparent_temperature: 0,
          daytime_hrs_below_10_c_apparent_temperature: 0,

          fair_days: 0,
          perfect_days: 0,
          active_days: 0,
          dinner_outside_days: 0,
          indoor_days: 0,

          daytime_hours: 0,

          daytime_hours_above_10_pct_cloud_cover: 0,
          daytime_hours_above_20_pct_cloud_cover: 0,
          daytime_hours_above_30_pct_cloud_cover: 0,
          daytime_hours_above_40_pct_cloud_cover: 0,
          daytime_hours_above_50_pct_cloud_cover: 0,
          daytime_hours_above_60_pct_cloud_cover: 0,
          daytime_hours_above_70_pct_cloud_cover: 0,
          daytime_hours_above_80_pct_cloud_cover: 0,
          daytime_hours_above_90_pct_cloud_cover: 0
        }
      }

      // temp metrics
      // check if under 10°C (50°F)
      if (temp < 10) {
        acc[year].hrs_below_10_c_apparent_temperature += 1
        // check if under 5°C (41°F)
        if (temp < 5) {
          acc[year].hrs_below_5_c_apparent_temperature += 1
          // check if under 0°C (32°F)
          if (temp < 0) {
            acc[year].hrs_below_0_c_apparent_temperature += 1
          }
        }
      }

      // daytime hour metrics
      if (
        local_time >= sun_times_cache.value.dawn &&
        local_time <= sun_times_cache.value.dusk
      ) {
        acc[year].daytime_hours += 1

        // daytime temp metrics
        // check if under 10°C (50°F)
        if (temp < 10) {
          acc[year].daytime_hrs_below_10_c_apparent_temperature += 1
          // check if under 5°C (41°F)
          if (temp < 5) {
            acc[year].daytime_hrs_below_5_c_apparent_temperature += 1
            // check if under 0°C (32°F)
            if (temp < 0) {
              acc[year].daytime_hrs_below_0_c_apparent_temperature += 1
            }
          }
        }

        // daytime cloud cover metrics
        if (cloudcover >= 10) {
          acc[year].daytime_hours_above_10_pct_cloud_cover += 1
          if (cloudcover >= 20) {
            acc[year].daytime_hours_above_20_pct_cloud_cover += 1
            if (cloudcover >= 30) {
              acc[year].daytime_hours_above_30_pct_cloud_cover += 1
              if (cloudcover >= 40) {
                acc[year].daytime_hours_above_40_pct_cloud_cover += 1
                if (cloudcover >= 50) {
                  acc[year].daytime_hours_above_50_pct_cloud_cover += 1
                  if (cloudcover >= 60) {
                    acc[year].daytime_hours_above_60_pct_cloud_cover += 1
                    if (cloudcover >= 70) {
                      acc[year].daytime_hours_above_70_pct_cloud_cover += 1
                      if (cloudcover >= 80) {
                        acc[year].daytime_hours_above_80_pct_cloud_cover += 1
                        if (cloudcover >= 90) {
                          acc[year].daytime_hours_above_90_pct_cloud_cover += 1
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }

        // calculate dinner outside days
        const dinner_outside_day_already_exists =
          acc[year].dates.dinner_outside_days[local_time_date_string]
        if (!dinner_outside_day_already_exists && hour >= 18 && hour <= 21) {
          // temp between 60°F (15.5°C) and 80°F (26.7°C)
          if (temp >= 15.5 && temp <= 26.7) {
            // wind speed below 24mph (38.6 km/h)
            if (wind_speed <= 38.6) {
              acc[year].dates.dinner_outside_days[local_time_date_string] = true
              acc[year].dinner_outside_days += 1
            }
          }
        }

        // calculate indoor day for today if it hasn't been calculated yet
        if (cache.indoor_days[local_time_date_string] === undefined) {
          // check if snowed any hour today
          const percipitation_hours_for_today = percipitation_hours.slice(
            index - hour,
            index + (24 - hour)
          )
          const snowed_today = percipitation_hours_for_today.some((h) =>
            Boolean(h.snowfall)
          )

          // not an indoor day if it snowed today
          // stop checking for indoor day if it snowed today
          if (!snowed_today) {
            // get daytime hours
            const dawn_hour = sun_times_cache.value.dawn.getHours()
            const dusk_hour = sun_times_cache.value.dusk.getHours()
            const weather_hours_for_daytime_hours = weather_hours.slice(
              index - (hour - dawn_hour),
              index + (dusk_hour - hour)
            )

            // indoor day if under 24°f (-4.4°c) more than 25% of daytime hours
            const cold_hours = weather_hours_for_daytime_hours.filter(
              (h) => h.apparent_temperature < -4.4
            )
            const cold_day =
              cold_hours.length / weather_hours_for_daytime_hours.length > 0.25
            if (cold_day) {
              cache.indoor_days[local_time_date_string] = true
              acc[year].dates.indoor_days[local_time_date_string] = true
              acc[year].indoor_days += 1

              // dont calculate fair, perfect, active days on an indoor day
              return acc
            }

            // indoor day if above 80°f (26.7°c) more than 25% of daytime hours
            const hot_hours = weather_hours_for_daytime_hours.filter(
              (h) => h.apparent_temperature > 26.7
            )
            const hot_day =
              hot_hours.length / weather_hours_for_daytime_hours.length > 0.25
            if (hot_day) {
              cache.indoor_days[local_time_date_string] = true
              acc[year].dates.indoor_days[local_time_date_string] = true
              acc[year].indoor_days += 1

              // dont calculate fair, perfect, active days on an indoor day
              return acc
            }

            // indoor day if wind above 28mph (45km/s) more than 25% of daytime hours
            const wind_hours_for_daytime_hours = wind_weather_hours.slice(
              index - (hour - dawn_hour),
              index + (dusk_hour - hour)
            )
            const windy_hours = wind_hours_for_daytime_hours.filter(
              (h) => h.windspeed_10m > 45
            )
            const windy_day =
              windy_hours.length / wind_hours_for_daytime_hours.length > 0.25
            if (windy_day) {
              cache.indoor_days[local_time_date_string] = true
              acc[year].dates.indoor_days[local_time_date_string] = true
              acc[year].indoor_days += 1

              // dont calculate fair, perfect, active days on an indoor day
              return acc
            }

            // indoor day if cloud cover above 70% and under 40°f (4.4°c) more than 25% of daytime hours
            const cloud_hours_for_daytime_hours =
              cloudcover_weather_hours.slice(
                index - (hour - dawn_hour),
                index + (dusk_hour - hour)
              )
            const cloudy_hours = cloud_hours_for_daytime_hours.filter(
              (h) => h.cloudcover > 70
            )
            const cloudy_day =
              cloudy_hours.length / cloud_hours_for_daytime_hours.length > 0.25

            const coldish_hours = weather_hours_for_daytime_hours.filter(
              (h) => h.apparent_temperature < 4.4
            )
            const coldish_day =
              coldish_hours.length / weather_hours_for_daytime_hours.length >
              0.25

            if (cloudy_day && coldish_day) {
              cache.indoor_days[local_time_date_string] = true
              acc[year].dates.indoor_days[local_time_date_string] = true
              acc[year].indoor_days += 1

              // dont calculate fair, perfect, active days on an indoor day
              return acc
            }
          }

          cache.indoor_days[local_time_date_string] = false
        }

        if (cache.indoor_days[local_time_date_string]) {
          // dont calculate fair, perfect, active days on an indoor day
          return acc
        }

        // calculate fair days
        const fair_day_already_exists =
          acc[year].dates.fair_days[local_time_date_string]
        // temp between 10°C (50°F) and 26°C (79°F)
        if (!fair_day_already_exists && temp >= 10 && temp <= 26) {
          if (index >= 3) {
            const prev_weather_hours = weather_hours.slice(index - 3, index)
            const prev_hours_have_fair_temp = prev_weather_hours.every(
              (h) =>
                h.apparent_temperature >= 10 && h.apparent_temperature <= 26
            )

            if (
              cache.at_least_5_hours_with_cloud_cover_under_75[
                local_time_date_string
              ] === undefined
            ) {
              // get all cloud cover hours for the day
              const dawn_hour = sun_times_cache.value.dawn.getHours()
              const dusk_hour = sun_times_cache.value.dusk.getHours()
              const cloudcover_weather_hours_for_day =
                cloudcover_weather_hours.slice(
                  index - (hour - dawn_hour),
                  index + (dusk_hour - hour)
                )

              // check if there are at least 5 hours with cloud cover < 75%
              const at_least_5_hours_with_cloud_cover_under_75 =
                cloudcover_weather_hours_for_day.filter(
                  (h) => h.cloudcover < 75
                ).length >= 5
              cache.at_least_5_hours_with_cloud_cover_under_75[
                local_time_date_string
              ] = at_least_5_hours_with_cloud_cover_under_75
            }

            if (
              prev_hours_have_fair_temp &&
              cache.at_least_5_hours_with_cloud_cover_under_75[
                local_time_date_string
              ]
            ) {
              acc[year].dates.fair_days[local_time_date_string] = true
              acc[year].fair_days += 1
            }
          }
        }

        // calculate perfect days
        const perfect_day_already_exists =
          acc[year].dates.perfect_days[local_time_date_string]
        // temp between 13.8°C (56.8°F) and 25.5°C (78.9°F)
        if (!perfect_day_already_exists && temp >= 13.8 && temp <= 25.5) {
          if (index >= 3) {
            const prev_weather_hours = weather_hours.slice(index - 3, index)
            const prev_hours_have_fair_temp = prev_weather_hours.every(
              (h) =>
                h.apparent_temperature >= 13.8 && h.apparent_temperature <= 25.5
            )

            if (
              cache.at_least_5_hours_with_cloud_cover_under_55[
                local_time_date_string
              ] === undefined
            ) {
              // get all cloud cover hours for the day
              const dawn_hour = sun_times_cache.value.dawn.getHours()
              const dusk_hour = sun_times_cache.value.dusk.getHours()
              const cloudcover_weather_hours_for_day =
                cloudcover_weather_hours.slice(
                  index - (hour - dawn_hour),
                  index + (dusk_hour - hour)
                )

              // check if there are at least 5 hours with cloud cover < 55%
              const at_least_5_hours_with_cloud_cover_under_55 =
                cloudcover_weather_hours_for_day.filter(
                  (h) => h.cloudcover < 55
                ).length >= 5
              cache.at_least_5_hours_with_cloud_cover_under_55[
                local_time_date_string
              ] = at_least_5_hours_with_cloud_cover_under_55
            }

            if (
              prev_hours_have_fair_temp &&
              cache.at_least_5_hours_with_cloud_cover_under_55[
                local_time_date_string
              ]
            ) {
              acc[year].dates.perfect_days[local_time_date_string] = true
              acc[year].perfect_days += 1
            }
          }
        }

        // calculate active days
        const active_day_already_exists =
          acc[year].dates.active_days[local_time_date_string]
        // temp between 7.2°C (45°F) and 23.3°C (74°F)
        if (!active_day_already_exists && temp >= 7.2 && temp <= 23.3) {
          if (index >= 3) {
            const prev_weather_hours = weather_hours.slice(index - 3, index)
            const prev_hours_have_fair_temp = prev_weather_hours.every(
              (h) =>
                h.apparent_temperature >= 7.2 && h.apparent_temperature <= 23.3
            )

            if (prev_hours_have_fair_temp) {
              acc[year].dates.active_days[local_time_date_string] = true
              acc[year].active_days += 1
            }
          }
        }
      }

      return acc
    },
    {}
  )

  const return_data = Object.keys(weather_data_by_year).reduce((acc, year) => {
    const year_data = weather_data_by_year[year]
    for (const key in year_data) {
      if (key === 'dates') {
        for (const date_key in year_data[key]) {
          acc[`${date_key}_${key}_in_${year}`] = Object.keys(
            year_data[key][date_key]
          )
        }
        continue
      }

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

  parcels_query.orderByRaw('RANDOM()')

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
