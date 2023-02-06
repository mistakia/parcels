import debug from 'debug'
// import yargs from 'yargs'
// import { hideBin } from 'yargs/helpers'

import db from '#db'
// import config from '#config'
import { isMain } from '#common'

// const argv = yargs(hideBin(process.argv)).argv
const log = debug('calculate-parcels-meta')
debug.enable('calculate-parcels-meta')

const is_tribal = (parcel) => {
  const lbcs_ownership_desc = ['Tribal Lands', 'Tribal lands in federal trust']

  if (lbcs_ownership_desc.includes(parcel.lbcs_ownership_desc)) {
    return true
  }

  const usedesc = ['TP - Tribal Property', 'Indian Reservations']

  if (usedesc.includes(parcel.usedesc)) {
    return true
  }

  const tribal_owners = [
    'USA IN TRUST',
    'USA IN TRUST FOR CROW TRIBE',
    'Indian Allotment Trust Lands',
    'FORT PECK INDIAN RESERVATION',
    'FORT BELKNAP INDIAN RESERVATION',
    'FORT PECK ASSINIBOINE & SIOUX TRIBES',
    'RED LAKE BAND RESERVATION',
    'FLATHEAD INDIAN RESERVATION',
    'NORTHERN CHEYENNE TRIBE',
    'USA IN TRUST FOR NORTHERN CHEYENNE TRIBE',
    'USA IN TRUST FOR THE BLACKFEET TRIBE OF',
    'USA IN TRUST FOR CSKT',
    'BLACKFEET TRIBE',
    'USA IN TRUST FOR',
    'United States Of America In Trust',
    'CROW TRIBE OF INDIANS',
    'UTE INDIAN TRIBE OF THE UINTAH AND OURAY INDIAN RESERVATION',
    'CONFEDERATED SALISH & KOOTENAI TRIBES',
    'NEZ PERCE TRIBE',
    'U S A IN TRUST',
    'Colville Confederated Tribes',
    'FLATHEAD RESERVATION',
    'Navajo Nation',
    'BLACKFEET TRIBE OF THE BLACKFEET INDIAN RESERVATION',
    'CROW TRIBE (OFF RES)',
    'ROCKY BOYS INDIAN RESERVATION',
    'FORT BELKNAP INDIAN COMMUNITY',
    'U S A TRUST',
    'USA RESERVATION-TRIBE',
    'CONFEDERATED TRIBES OF THE UMATILLA INDIAN RESERVATION',
    'NORTHERN ARAPAHO TRIBE'
  ]

  if (tribal_owners.includes(parcel.owner)) {
    return true
  }

  return false
}

const is_public = (parcel) => {
  const lbcs_ownership_desc = [
    'Federal government',
    'State government',
    'City, Village, Township, etc.',
    'County, Parish, Province, etc.',
    'Regional government'
  ]

  if (lbcs_ownership_desc.includes(parcel.lbcs_ownership_desc)) {
    return true
  }

  const usedesc = [
    'Federal National Forest',
    'STATE ADMIN-DNR PILT',
    'State Public Property/non-PILT',
    'Exempt Govt'
  ]

  if (usedesc.includes(parcel.usedesc)) {
    return true
  }

  const public_owners = [
    'USDI BUREAU OF LAND MANAGEMENT',
    'USDA FOREST SERVICE',
    'STATE OF MONTANA',
    'UNITED STATES OF AMERICA',
    'USA',
    'BUREAU OF LAND MANAGEMENT',
    'U S A',
    'U S A KNF',
    'BLM',
    'U.S.',
    'B L M',
    'US FOREST SERVICE',
    'USDI BUREAU OF LAND MGMT (RESERVED)',
    'USA - FOREST SERVICE',
    'STATE OF MINNESOTA',
    'UNITED STATES',
    'USA-BUREAU OF LAND MANAGEMENT',
    'CITY OF LOS ANGELES DWP',
    'SIERRA PACIFIC LAND & TIMBER COMPANY',
    'GREAT SALT LAKE',
    'USDI FISH AND WILDLIFE SERVICE',
    'State of N.M.',
    'NM STATE LAND OFFICE',
    'STATE OF WYOMING',
    'NPS',
    'U S A SNF',
    'State of Idaho',
    'STATE OF IDAHO',
    'CUSTER NATIONAL FOREST',
    'STATE OF MICHIGAN',
    'USDI NATIONAL PARK SERVICE',
    'IDAHO, STATE OF',
    'US',
    'USDI BUREAU OF LAND MANGEMENT',
    'BUREAU LAND MANAGEMENT',
    'DEPARTMENT OF THE INTERIOR',
    'U S FOREST SERVICE',
    'State Of New Mexico',
    'USA - BWCA',
    'State of Utah',
    'STATE OF UTAH',
    'STATE OF COLORADO',
    'USFS (SUPERIOR NATL FOREST)',
    'STATE OF MONTANA - TRUST',
    'USDI FISH WILDLIFE SERVICE',
    'New Mexico State Land',
    'STATE OF TEXAS',
    'U S GOVERNMENT',
    'USDI - BUREAU OF LAND MANAGEMENT',
    'DEPARTMENT OF INTERIOR',
    'DEPARTMENT OF AGRICULTURE',
    'STATE OF WYOMING STATE SCHOOL',
    'USDA',
    'STATE OF MONTANA STATE LANDS',
    'USDI FISH & WILDLIFE SERVICE',
    'STATE OF MONTANA DNRC',
    'NEW MEXICO,STATE OF',
    'Blm Usa',
    'USDI BUREAU OF RECLAMATION',
    'U S A PUBLIC DOMAIN',
    'STATE OF WASHINGTON',
    'USDI BUREAU OF LAND MANAGEMENT (RES)',
    'HILL AIR FORCE RANGE',
    'USDI BUREAU OF LAND MGMT BANKHEAD-JONES',
    'STATE OF NM BATAAN MEMORIAL BLDG c/o STATE LAND OFFICE',
    'USFS',
    'DEPT OF THE ARMY CORP OF ENGINEERS CORP OF ENGINEERS',
    'US DEPARTMENT OF DEFENSE',
    'California State Lands Commission',
    'UNITED STATES FOREST SERVICE',
    'UNITED STATES GOVT BUREAU OF LAND MANAGE',
    'USDI FISH WILDLIFE SERVICES',
    'MI STATE OF',
    'US CORP OF ENGINEERS',
    'STATE OF OREGON DEPT OF STATE LANDS',
    'COLORADO, STATE OF',
    'U S A - FOREST SERVICE',
    'STATE OF OREGON',
    'WA DNR',
    'USA BLM',
    'Utah, State of',
    'U S A MNF',
    'USDI BLM (RESERVED)',
    'MONTANA STATE OF',
    'STATE OF CALIFORNIA',
    'U.S. Forest Service',
    'OREGON, DEPT OF STATE LANDS',
    'U S BUREAU OF LAND MANAGEMENT',
    'STATE OF MT DNRC',
    'CITY OF LOS ANGELES',
    'UTAH STATE OF DEPT OF NATURAL RESOURCES DIV OF WILDLIFE RESOURCES',
    'USA BUREAU OF LAND MANAGEMENT',
    'COLORADO STATE LAND BOARD',
    'Los Angeles - Department of Water and Power, City of',
    'MONTANA DEPT OF FISH WILDLIFE & PARKS',
    'SAWTOOTH NATIONAL FOREST',
    'ARIZONA STATE OF',
    'FEDERAL GOVERNMENT',
    'STATE OF COLORADO LAND BOARD',
    'SAN JUAN NATIONAL FOREST',
    'U S A FISH & WILDLIFE SERVICE',
    'MONTANA FISH WILDLIFE & PARKS',
    'DEPT OF STATE LANDS',
    'STATE OF CALIF',
    'B.L.M.',
    'SAWTOOTH NATIONAL RECREATION',
    'STATE OF MINNESOTA/BWCA',
    'UNITED STATES DEPARTMENT OF AGRICULTURE',
    'United States (Bombing Range)',
    'California Department of Fish and Wildlife',
    'MICHIGAN DEPARTMENT OF TREASURY',
    'DNRC SCHOOL TRUST LAND',
    'BOISE NATIONAL FOREST',
    'U S A - BLM',
    'UNIVERSITY OF TEXAS',
    'STATE MN - DNR',
    'Federal Public Land',
    'USA FOREST',
    'IDAHO DEPT OF LANDS',
    'STATE OF MN - DNR',
    'STATE OF COLORADO STATE BOARD OF LAND COMMISSIONERS',
    'DNRC',
    'BOX ELDER COUNTY',
    'Lincoln National Forest Usa',
    'DEPT OF FISH & WILDLIFE',
    'MONTANA DEPARTMENT OF FISH WILDLIFE & PARKS',
    'FOREST SERVICE',
    'STATE OF MINNESOTA DOT',
    'STATE OF IDAHO DEPT OF LANDS',
    'STATE OF UTAH SCHOOL AND INSTITUTIONAL TRUST LANDS ADMINISTRATION',
    'ROSWELL,CITY OF',
    'HARNEY COUNTY',
    'ALAMOGORDO CITY OF',
    'UNITED STATES OF AMERICA, NATIONAL PARK',
    'USDI BLM (RESERVED) MONTANA STATE OFFICE',
    'NATIONAL PARK SERVICE',
    'New Mexico State Land Office',
    'LINCOLN COUNTY',
    'MINERAL COUNTY',
    'Farmington City Of',
    'U S A NATL MONUMENT',
    'US BUREAU OF LAND MANAGEMENT',
    'OREGON, STATE OF',
    'STATE OF NEVADA',
    'STATE OF NORTH CAROLINA',
    'CALIF STATE OF FISH & GAME',
    'MONTANA FISH WILDLIFE AND PARKS',
    'COLORADO DIVISION OF WILDLIFE',
    'MI DEPT OF NATURAL RESOURCES',
    'STATE OF WYOMING DEPARTMENT OF TRANSPORTATION',
    'USA BLM VALE DISTRICT',
    'USDA - BUREAU OF LAND MGMT-RES',
    'STATE OF MONTANA DEPT OF STATE LANDS',
    'LANDER COUNTY TREASURER',
    'TOOELE COUNTY',
    'SAGUACHE COUNTY',
    'WYOMING GAME & FISH COMMISSION',
    'BUREAU OF INDIAN AFFAIRS',
    'STATE OF MN STATE SWAMP',
    'MONTANA STATE PRISON',
    'UNITED STATES OF AMERICA USFS',
    'SISKIYOU CO OF',
    'OREGON PARKS AND RECREATION DEPT',
    'Ft Bliss Military Reserve Usa',
    'RIVERTON CITY OF',
    'OREGON, STATE OF PARKS & REC',
    'STATE OF ARIZONA',
    'CIBOLA NATIONAL FOREST',
    'JEROME HIGHWAY DISTRICT',
    'UNITED STATES OF AMERICA MEDICINE BOW NATIONAL FOREST',
    'U S A BUR RECLM',
    'AGASSIZ NATL WILDLIFE REFUGE',
    'MONTANA DEPARTMENT OF FISH',
    'USA (BLM)',
    'SWEETWATER COUNTY',
    'ELKO CO TREAS TR',
    'United States Federal Land',
    'U S A STNF',
    'DIVISION OF WATER RESOURCES',
    'CITY OF ROCK SPRINGS',
    'USA & SNRA',
    'NATIONAL GRASSLAND USFS',
    'COOK CO-STATE MN',
    'ROOSEVELT COUNTY',
    'COUNTY OF LASSEN',
    'SANDERS COUNTY',
    'CALIFORNIA STATE OF',
    'MONTANA DEPARTMENT OF TRANSPORTATION',
    'STATE OF IDAHO DEPT OF HIGHWAYS',
    'USDI FISH & WILDLIFE SERVICES',
    'STATE OF MONTANA DEPARTMENT OF NATURAL RESOURCES',
    'CITY OF JEROME',
    'JEROME CITY',
    'JEROME COUNTY TREASURER',
    'JEROME COUNTY COURTHOUSE',
    'HAZELTON VILLAGE OF',
    'HAZELTON CITY',
    'UNITED STATES POSTAL SERVICE',
    'IDAHO TRANSPORTATION DEPARTMENT',
    'COUNTY OF JEROME',
    'MILITARY DIVISION',
    'MCCALL CITY OF',
    'VALLEY COUNTY',
    'AGRICULTURE DEPT OF (C/B)',
    'FISH & GAME DEPT OF (C/B)',
    'DONNELLY CITY OF',
    'CASCADE CITY OF',
    'STATE OF IDAHO FISH & GAME COMMISSION',
    'USA FOREST SERVICE US DEPT OF AGRICULTURE WASHINGTON DC 200',
    'UNITED STATES OF AMERICA ETAL',
    'LANDS DEPT OF C/B',
    'STATE OF MN - PARK',
    'PARKS & TRAILS COUNCIL OF MINNESOTA',
    'MN PARKS & TRAILS COUNCIL',
    'COLORADO PARKS & WILDLIFE',
    'DEPARTMENT OF TRANSPORTATION',
    'COLORADO HIGHWAY DEPARTMENT',
    'STATE GAME AND FISH DEPT',
    'DEPARTMENT OF GAME AND FISH',
    'DEPARTMENT OF HIGHWAYS',
    'TEXAS PARKS & WILDLIFE',
    'UNIVERSITY OF TEXAS -UNIV LANDS',
    'CALIF STATE OF DIV OF HWYS'
  ]

  if (public_owners.includes(parcel.owner)) {
    return true
  }

  return false
}

const process_parcels = async (parcels) => {
  const inserts = []
  for (const parcel of parcels) {
    inserts.push({
      path: parcel.path,
      public: is_public(parcel),
      tribal: is_tribal(parcel)
    })
  }

  if (inserts.length) {
    await db('parcels_meta').insert(inserts).onConflict().merge()
    log(`inserted ${inserts.length} parcel meta rows`)
  }
}

const calculate_parcels_meta = async () => {
  const chunk_size = 100000
  let offset = 0
  let parcels
  do {
    parcels = await db('parcels').limit(chunk_size).offset(offset)
    await process_parcels(parcels)
    offset += chunk_size
  } while (parcels.length)
}

export default calculate_parcels_meta

const main = async () => {
  let error
  try {
    await calculate_parcels_meta()
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
