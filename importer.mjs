import import_hourly_weather from '#scripts/import-hourly-weather.mjs'

const main = async () => {
  await import_hourly_weather()
}

try {
  main()
} catch (err) {
  console.log(err)
}
