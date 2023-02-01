import debug from 'debug'
// import yargs from 'yargs'
// import { hideBin } from 'yargs/helpers'

// import db from '#db'
// import config from '#config'
import { isMain } from '#common'

// const argv = yargs(hideBin(process.argv)).argv
const log = debug('import-travel-distance')
debug.enable('import-travel-distance')

const import_travel_distance = async () => {

}

export default import_travel_distance

const main = async () => {
  let error
  try {
    await import_travel_distance()
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
