import open from 'open'

export default function (geojson) {
  open(
    'http://geojson.io/#data=data:application/json,' +
      encodeURIComponent(JSON.stringify(geojson))
  )
}
