import debug from 'debug'
import fs from 'fs-extra'
import path from 'path'
import * as turf from '@turf/turf'
// import yargs from 'yargs'
// import { hideBin } from 'yargs/helpers'

import db from '#db'
// import config from '#config'
import { isMain, data_path } from '#common'

// const argv = yargs(hideBin(process.argv)).argv
const log = debug('import-roads')
debug.enable('import-roads')

const format_roads = ({
  number,
  class: road_class,
  type,
  divided,
  country,
  state,
  length,
  continent
}) => ({
  number,
  road_class,
  type,
  divided,
  country,
  state,
  length,
  continent
})

function get_chunks(array, size) {
  const chunks = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

const import_roads = async () => {
  const roads_geojson = fs.readJsonSync(
    path.resolve(data_path, './north_american_roads.geo.json')
  )

  const inserts = []
  turf.featureEach(roads_geojson, (road) => {
    inserts.push({
      lineString: JSON.stringify(road.geometry.coordinates),
      ...format_roads(road.properties)
    })
  })

  if (inserts.length) {
    const chunk_size = 1000
    const chunks = get_chunks(inserts, chunk_size)
    for (const chunk of chunks) {
      await db('roads').insert(chunk).onConflict().merge()
      log(`inserted ${chunk.length} roads`)
    }
  }

  /* const unpaved_roads = inserts.filter(i => i.type === 'Trail')
   * const unpaved_roads_geojson = turf.featureCollection([
   *   ...unpaved_roads.map(insert => turf.lineString(JSON.parse(insert.lineString)))
   * ])
   * fs.writeJsonSync('./test.geo.json', unpaved_roads_geojson) */
}

export default import_roads

const main = async () => {
  let error
  try {
    await import_roads()
  } catch (err) {
    error = err
    console.log(error)
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
