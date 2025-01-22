import debug from 'debug'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import fs from 'fs/promises'
import path from 'path'

import db from '#db'
import { isMain } from '#utils'

const log = debug('import-election-results')
debug.enable('import-election-results')

const run = async ({ directory, year }) => {
  log(`Importing election results from ${directory} for year ${year}`)

  const files = await fs.readdir(directory)
  const geojson_files = files.filter((file) => file.endsWith('.geojson'))

  log(`Found ${geojson_files.length} geojson files`)

  for (const file of geojson_files) {
    const file_path = path.join(directory, file)
    const data = await fs.readFile(file_path, 'utf-8')
    const features = JSON.parse(data)

    // Handle both single feature and feature collection
    const features_array =
      features.type === 'FeatureCollection' ? features.features : [features]

    for (const feature of features_array) {
      const {
        geometry,
        properties: {
          state,
          GEOID: geoid,
          votes_dem,
          votes_rep,
          votes_total,
          pct_dem_lead,
          official_boundary
        }
      } = feature

      await db('election_results')
        .insert({
          election_year: year,
          coordinates: db.raw('ST_GeomFromGeoJSON(?)', [
            JSON.stringify(geometry)
          ]),
          state,
          geoid,
          votes_dem,
          votes_rep,
          votes_total,
          pct_dem_lead,
          official_boundary
        })
        .onConflict(['geoid', 'election_year'])
        .merge()
    }
  }

  log('Import complete')
}

// Parse command line arguments
const argv = yargs(hideBin(process.argv))
  .option('directory', {
    alias: 'd',
    type: 'string',
    description: 'Directory containing geojson files',
    demandOption: true
  })
  .option('year', {
    alias: 'y',
    type: 'number',
    description: 'Election year',
    demandOption: true
  }).argv

const main = async () => {
  let error
  try {
    await run({
      directory: argv.directory,
      year: argv.year
    })
  } catch (err) {
    error = err
    console.error(error)
  }

  process.exit(error ? 1 : 0)
}

if (isMain) {
  main()
}

export default run
