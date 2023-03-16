/* global describe it */

import chai from 'chai'

import { get_sun_times } from '#utils'

chai.should()
const expect = chai.expect

describe('get_sunrise_sunset', () => {
  it('should return sunrise and sunset times', () => {
    const sun_times = get_sun_times({
      longitude: -73.98435147288197,
      latitude: 40.74994207884398,
      time: '2023-03-15T23:53:51Z'
    })

    expect(sun_times.solarNoon).to.deep.equal(
      new Date('2023-03-15T17:06:18.172Z')
    )
    expect(sun_times.nadir).to.deep.equal(new Date('2023-03-15T05:06:18.172Z'))
    expect(sun_times.sunrise).to.deep.equal(
      new Date('2023-03-15T11:09:29.825Z')
    )
    expect(sun_times.sunset).to.deep.equal(new Date('2023-03-15T23:03:06.520Z'))
    expect(sun_times.sunriseEnd).to.deep.equal(
      new Date('2023-03-15T11:12:18.832Z')
    )
    expect(sun_times.sunsetStart).to.deep.equal(
      new Date('2023-03-15T23:00:17.512Z')
    )
    expect(sun_times.dawn).to.deep.equal(new Date('2023-03-15T10:42:12.484Z'))
    expect(sun_times.dusk).to.deep.equal(new Date('2023-03-15T23:30:23.860Z'))
    expect(sun_times.nauticalDawn).to.deep.equal(
      new Date('2023-03-15T10:10:24.032Z')
    )
    expect(sun_times.nauticalDusk).to.deep.equal(
      new Date('2023-03-16T00:02:12.313Z')
    )
    expect(sun_times.nightEnd).to.deep.equal(
      new Date('2023-03-15T09:38:11.330Z')
    )
    expect(sun_times.night).to.deep.equal(new Date('2023-03-16T00:34:25.014Z'))
    expect(sun_times.goldenHourEnd).to.deep.equal(
      new Date('2023-03-15T11:45:44.317Z')
    )
    expect(sun_times.goldenHour).to.deep.equal(
      new Date('2023-03-15T22:26:52.027Z')
    )
  })
})
