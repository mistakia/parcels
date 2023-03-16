import suncalc from 'suncalc'
import { find } from 'geo-tz'

export default function get_sun_times({ longitude, latitude, time }) {
  // convert iso8601 GMT+0 time to local time based on longitude, latitude
  const tz = find(latitude, longitude)[0]
  const local_time = time.toLocaleString('en-US', {
    timeZone: tz
  })

  return suncalc.getTimes(new Date(local_time), latitude, longitude)
}
