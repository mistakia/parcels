import open from 'open'

export default function (geojson) {
  console.log(geojson.features.length)
  return open(
    'http://geojson.io/#data=data:application/json,' +
      encodeURIComponent(JSON.stringify(geojson))
  )
}
