import debug from 'debug'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import suncalc from 'suncalc'
import fetch from 'node-fetch'
import { find } from 'geo-tz'
import qs from 'qs'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'

import db from '#db'
import { isMain, get_parcels_query } from '#utils'

dayjs.extend(utc)
dayjs.extend(timezone)

const argv = yargs(hideBin(process.argv))
  .option('parcels', {
    type: 'boolean',
    description: 'Calculate weather for parcels'
  })
  .option('year', {
    type: 'number',
    description: 'Specify year for calculations',
    default: new Date().getFullYear()
  })
  .option('dry', {
    type: 'boolean',
    description: 'Run calculations without saving to database'
  })
  .option('ll_uuid', {
    type: 'string',
    description: 'Lookup coordinates by parcel ll_uuid'
  })
  .option('lat', {
    type: 'number',
    description: 'Latitude coordinate'
  })
  .option('lon', {
    type: 'number',
    description: 'Longitude coordinate'
  }).argv

const log = debug('calculate-hourly-weather-api')
debug.enable('calculate-hourly-weather-api')

const get_hourly_weather = async ({
  latitude,
  longitude,
  year = new Date().getFullYear()
}) => {
  const hourly = [
    'temperature_2m',
    // 'relativehumidity_2m',
    // 'dewpoint_2m',
    'apparent_temperature',
    // 'surface_pressure',
    // 'precipitation',
    // 'rain',
    'snowfall',
    'cloudcover',
    // 'shortwave_radiation',
    // 'direct_radiation',
    // 'direct_normal_irradiance',
    // 'diffuse_radiation',
    'windspeed_10m'
    // 'winddirection_10m',
    // 'windgusts_10m',
    // 'et0_fao_evapotranspiration',
    // 'weathercode',
    // 'vapor_pressure_deficit',
    // 'soil_temperature_0_to_7cm',
    // 'soil_temperature_7_to_28cm',
    // 'soil_temperature_28_to_100cm',
    // 'soil_temperature_100_to_255cm',
    // 'soil_moisture_0_to_7cm',
    // 'soil_moisture_7_to_28cm',
    // 'soil_moisture_28_to_100cm',
    // 'soil_moisture_100_to_255cm'
  ]

  const query_params = {
    latitude,
    longitude,
    start_date: `${year}-01-01`,
    end_date: `${year}-12-31`,
    hourly
  }

  const query_string = qs.stringify(query_params, {
    arrayFormat: 'comma'
  })

  const url = `http://storage:8085/v1/archive?${query_string}`
  const response = await fetch(url)
  const data = await response.json()

  return data
}

const calculate_hourly_weather = async ({ longitude, latitude, year }) => {
  const weather_data = await get_hourly_weather({
    latitude,
    longitude,
    year
  })

  if (!weather_data?.hourly) {
    return null
  }

  const weather_hours = weather_data.hourly.time.map((time, i) => ({
    time,
    apparent_temperature: weather_data.hourly.apparent_temperature[i]
  }))

  const cloudcover_weather_hours = weather_data.hourly.time.map((time, i) => ({
    time,
    cloudcover: weather_data.hourly.cloudcover[i]
  }))

  const wind_weather_hours = weather_data.hourly.time.map((time, i) => ({
    time,
    windspeed_10m: weather_data.hourly.windspeed_10m[i]
  }))

  const percipitation_hours = weather_data.hourly.time.map((time, i) => ({
    time,
    snowfall: weather_data.hourly.snowfall[i]
  }))

  if (
    !weather_hours?.length ||
    !cloudcover_weather_hours?.length ||
    !wind_weather_hours?.length
  ) {
    return null
  }

  // get timezone from coordinates
  const tz = find(latitude, longitude)[0]

  // console.time('calculate_hourly_weather')

  const sun_times_cache = {
    key: null,
    value: null,
    dawn: null,
    dusk: null
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

      // Parse the iso8601 time in the location's timezone
      const local_time = dayjs(weather_hour.time, tz)
      const hour = local_time.hour()
      const year = local_time.year()
      const local_time_date_string = local_time.format('YYYY-MM-DD')

      // hardcoded fix for timezone adjustment resulting in a few hours of 2014 data
      if (year === 2014) {
        return acc
      }

      if (sun_times_cache.key !== local_time_date_string) {
        // Calculate sun times using the local date at noon
        const noon_time = local_time.hour(12).minute(0).second(0)
        const raw_sun_times = suncalc.getTimes(
          noon_time.toDate(), // convert to date object
          latitude,
          longitude
        )

        // Cache both raw times and dayjs converted times
        sun_times_cache.value = raw_sun_times
        sun_times_cache.dawn = dayjs(raw_sun_times.dawn).tz(tz)
        sun_times_cache.dusk = dayjs(raw_sun_times.dusk).tz(tz)
        sun_times_cache.key = local_time_date_string
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
        local_time.isAfter(sun_times_cache.dawn) &&
        local_time.isBefore(sun_times_cache.dusk)
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
            const dawn_hour = sun_times_cache.dawn.hour()
            const dusk_hour = sun_times_cache.dusk.hour()
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
              const dawn_hour = sun_times_cache.dawn.hour()
              const dusk_hour = sun_times_cache.dusk.hour()
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
              const dawn_hour = sun_times_cache.dawn.hour()
              const dusk_hour = sun_times_cache.dusk.hour()
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

  const year_data = weather_data_by_year[year]
  const return_data = {
    year,
    ...year_data,
    // Transform the dates objects into arrays
    fair_days_dates: Object.keys(year_data.dates.fair_days),
    perfect_days_dates: Object.keys(year_data.dates.perfect_days),
    active_days_dates: Object.keys(year_data.dates.active_days),
    dinner_outside_days_dates: Object.keys(year_data.dates.dinner_outside_days),
    indoor_days_dates: Object.keys(year_data.dates.indoor_days)
  }
  // Remove the nested dates object since we flattened it
  delete return_data.dates

  // console.timeEnd('calculate_hourly_weather')

  return return_data
}

const save_hourly_weather = async (inserts) => {
  await db('parcels_weather')
    .insert(inserts)
    .onConflict(['ll_uuid', 'year'])
    .merge()
  log(`inserted ${inserts.length} parcel hourly weather metrics`)
}

const get_filtered_parcels = async () => {
  const parcels_query = get_parcels_query()

  return parcels_query
    .select('parcels.ll_uuid', 'parcels.lon', 'parcels.lat')
    .leftJoin('parcels_weather', 'parcels_weather.ll_uuid', 'parcels.ll_uuid')
    .whereNull('parcels_weather.updated')
    .orderByRaw('RANDOM()')
}

const calculate_parcels_for_batch = async (parcels) => {
  const timestamp = Math.round(Date.now() / 1000)
  let inserts = []
  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]
  log(`parcels missing weather metrics: ${parcels.length}`)

  for (const [index, parcel] of parcels.entries()) {
    const { ll_uuid } = parcel
    const longitude = Number(parcel.lon)
    const latitude = Number(parcel.lat)

    log(`Processing parcel ${index + 1}/${parcels.length} (${ll_uuid})`)

    for (const year of years) {
      const year_data = await calculate_hourly_weather({
        longitude,
        latitude,
        year
      })

      if (!year_data) continue

      inserts.push({
        ll_uuid,
        year,
        updated: timestamp,
        ...year_data
      })
    }

    // Save in smaller batches to avoid memory issues
    if (inserts.length >= 20 && !argv.dry) {
      await save_hourly_weather(inserts)
      inserts = []
    }

    // Force garbage collection after each parcel if available
    if (global.gc) {
      global.gc()
    }
  }

  if (inserts.length && !argv.dry) {
    await save_hourly_weather(inserts)
  } else if (inserts.length && argv.dry) {
    console.log('Dry run - would have inserted:', inserts)
  }
}

const calculate_filtered_parcels = async () => {
  try {
    const parcels = await get_filtered_parcels()
    await calculate_parcels_for_batch(parcels)
    log('Finished processing all parcels')
  } catch (error) {
    log('Error processing parcels:', error)
    throw error
  }
}

const get_parcel_by_ll_uuid = async (ll_uuid) => {
  const parcel = await db('parcels')
    .select('lon', 'lat')
    .where({ ll_uuid })
    .first()
  return parcel
}

const main = async () => {
  let error
  try {
    if (argv.parcels) {
      await calculate_filtered_parcels()
    } else {
      let longitude
      let latitude

      if (argv.ll_uuid) {
        const parcel = await get_parcel_by_ll_uuid(argv.ll_uuid)
        if (!parcel) {
          throw new Error(`No parcel found with ll_uuid: ${argv.ll_uuid}`)
        }
        longitude = parcel.lon
        latitude = parcel.lat
      } else if (argv.lat && argv.lon) {
        longitude = argv.lon
        latitude = argv.lat
      } else {
        // Default coordinates if no input provided
        longitude = -80.3517
        latitude = 38.2242
      }

      const data = await calculate_hourly_weather({
        longitude,
        latitude,
        year: argv.year
      })
      console.log(data)
    }
  } catch (err) {
    error = err
    console.log(error)
  }
  process.exit()
}

if (isMain) {
  main()
}

export default calculate_hourly_weather
