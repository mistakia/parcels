import debug from 'debug'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import fs from 'fs/promises'

import db from '#db'
import { isMain } from '#utils'

const log = debug('import-usgs-seismic-hazard-model')
debug.enable('import-usgs-seismic-hazard-model')

const run = async ({ file_path, year }) => {
  log(`Importing USGS seismic hazard model from ${file_path} for year ${year}`)

  // Check if file exists
  try {
    await fs.access(file_path)
  } catch (err) {
    throw new Error(`File ${file_path} does not exist`)
  }

  // Read and validate GeoJSON
  let data
  let features
  try {
    data = await fs.readFile(file_path, 'utf-8')
    features = JSON.parse(data)
  } catch (err) {
    throw new Error(`Invalid JSON in file ${file_path}: ${err.message}`)
  }

  // Validate GeoJSON structure
  if (
    !features.type ||
    (features.type !== 'Feature' && features.type !== 'FeatureCollection')
  ) {
    throw new Error('Invalid GeoJSON: Missing or invalid "type" property')
  }

  if (
    features.type === 'FeatureCollection' &&
    !Array.isArray(features.features)
  ) {
    throw new Error(
      'Invalid GeoJSON: FeatureCollection missing "features" array'
    )
  }

  // Instead of clearing existing data with DELETE, use TRUNCATE
  await db.raw('TRUNCATE TABLE usgs_seismic_hazards_model')
  log('Cleared existing data')

  // Handle both single feature and feature collection
  const features_array =
    features.type === 'FeatureCollection' ? features.features : [features]

  for (const feature of features_array) {
    if (!feature.geometry || !feature.properties) {
      continue
    }

    const {
      geometry,
      properties: { low_cont, high_cont }
    } = feature

    const normalized_low_cont =
      low_cont == null ? null : Math.max(0, Number(low_cont))
    const normalized_high_cont =
      high_cont == null ? null : Math.max(0, Number(high_cont))

    await db('usgs_seismic_hazards_model').insert({
      year,
      coordinates: db.raw('ST_GeomFromGeoJSON(?)', [JSON.stringify(geometry)]),
      low_cont: normalized_low_cont,
      high_cont: normalized_high_cont
    })
  }

  log('Import complete')
}

// Parse command line arguments
const argv = yargs(hideBin(process.argv))
  .option('file_path', {
    alias: 'f',
    type: 'string',
    description: 'Path to USGS seismic hazard model GeoJSON file',
    demandOption: true
  })
  .option('year', {
    alias: 'y',
    type: 'number',
    description: 'Year of the seismic hazard model',
    demandOption: true
  }).argv

const main = async () => {
  let error
  try {
    await run({
      file_path: argv.file_path,
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
