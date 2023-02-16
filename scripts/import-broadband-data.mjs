import debug from 'debug'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import db from '#db'
// import config from '#config'
import { isMain, get_file_paths, import_csv } from '#utils'

const argv = yargs(hideBin(process.argv)).argv
const log = debug('import-broadband-data')
debug.enable('import-broadband-data')

const get_extension = (file_path) => {
  const file_parts = file_path.split('.')
  const extension = file_parts[file_parts.length - 1]
  return extension
}

const get_type = (file_path) => {
  // bdc_{State FIPS}_{Technology}_fixed_broadband_{Data As-of Date}
  if (/bdc_[0-9]{2}_[A-Za-z-]+_fixed_broadband/gi.test(file_path)) {
    return 'availability'
  }

  // bdc_{State FIPS}_{Technology}_mobile_broadband_h3_{Data As-of Date}.zip

  // bdc_us_broadband_summary_by_geography_{Data As-of Date}.zip

  // bdc_us_provider_summary_by_geography_{Data As-of Date}.zip

  // bdc_us_fixed_broadband_provider_summary_{Data As-of Date}.zip

  // bdc_us_mobile_broadband_provider_summary_{Data As-of Date}.zip

  // bdc_{State FIPS}_{Provider ID}_{Technology}_fixed_broadband_{Data As-of Date}.zip

  // bdc_{State FIPS}_{Provider ID}_{Technology}_mobile_broadband_h3_{Data As-of Date}.zip

  // bdc_us_{Provider ID}_{Technology}_supporting_data_{Data As-of Date}.zip

  // bdc_us_{Provider ID}_{Technology}_fixed_broadband_coverage_methodology_{Data As-of Date}.csv

  return null
}

const import_broadband_data = async ({ path }) => {
  const file_paths = await get_file_paths(path)
  for (const file_path of file_paths) {
    const extension = get_extension(file_path)
    if (extension !== 'csv') {
      continue
    }

    const file_type = get_type(file_path)

    if (!file_type) {
      continue
    }

    log(file_path)
    await import_csv({
      file_path,
      chunk_size: 10000,
      save: async (chunk) => {
        await db('broadband_availability').insert(chunk).onConflict().merge()
        log(`inserted ${chunk.length} broadband availability data`)
      }
    })
  }
}

export default import_broadband_data

const main = async () => {
  let error
  try {
    await import_broadband_data({ path: argv.path })
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
