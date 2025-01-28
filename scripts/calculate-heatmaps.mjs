import debug from 'debug'
// import yargs from 'yargs'
// import { hideBin } from 'yargs/helpers'

import db from '#db'
// import config from '#config'
import { isMain } from '#utils'

// const argv = yargs(hideBin(process.argv)).argv
const log = debug('calculate-heatmaps')
debug.enable('calculate-heatmaps')

const calculate_hardiness_heatmaps = async () => {
  try {
    await db.raw(`
      INSERT INTO parcels_production.heatmaps (h3_res4_id, median_hardiness_temp_rank)
      SELECT
        h3_lat_lng_to_cell(ST_MakePoint(p.lon, p.lat), 4) AS h3_res4_id,
        percentile_cont(0.5) WITHIN GROUP (ORDER BY pr.hardiness_temp_rank) AS median_hardiness_temp_rank
      FROM parcels_production.parcels p
      JOIN parcels_production.parcels_rank pr ON p.ll_uuid = pr.ll_uuid
      GROUP BY h3_lat_lng_to_cell(st_makepoint(p.lon, p.lat), 4)
      ON CONFLICT (h3_res4_id) DO UPDATE SET median_hardiness_temp_rank = EXCLUDED.median_hardiness_temp_rank;
    `)
    log('Saved hardiness heatmaps')
  } catch (error) {
    log(`Error calculating hardiness heatmaps: ${error}`)
  }
}

const calculate_parcels_count = async () => {
  try {
    await db.raw(`
      INSERT INTO parcels_production.heatmaps (h3_res4_id, parcels_count)
      SELECT
        h3_lat_lng_to_cell(ST_MakePoint(p.lon, p.lat), 4) AS h3_res4_id,
        COUNT(*) AS parcels_count
      FROM parcels_production.parcels p
      GROUP BY h3_lat_lng_to_cell(st_makepoint(p.lon, p.lat), 4)
      ON CONFLICT (h3_res4_id) DO UPDATE SET parcels_count = EXCLUDED.parcels_count;
    `)
    log('Saved parcels count heatmap')
  } catch (error) {
    log(`Error calculating parcels count heatmap: ${error}`)
  }
}

const calculate_heatmaps = async () => {
  await calculate_hardiness_heatmaps()
  await calculate_parcels_count()
}

export default calculate_heatmaps

const main = async () => {
  let error
  try {
    await calculate_heatmaps()
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
