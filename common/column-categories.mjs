const column_categories = {
  LOCATION: {
    priority: 1
  },
  ADDRESS: {
    priority: 2
  },
  COORDINATES: {
    priority: 2
  },
  DISTANCE_TO_FEATURES: {
    priority: 2
  },
  AIRPORT: {
    priority: 3
  },
  MILITARY: {
    priority: 3
  },
  SPRING: {
    priority: 3
  },
  WATER: {
    priority: 3
  },
  HEALTHCARE: {
    priority: 3
  },
  LIBRARY: {
    priority: 3
  },
  NATURAL: {
    priority: 3
  },
  POLLUTION: {
    priority: 1
  },
  PUBLIC_LAND: {
    priority: 3
  },
  RELIGIOUS: {
    priority: 3
  },
  DENSITY: {
    priority: 2
  },
  GEOLOGIC_FEATURES: {
    priority: 3
  },
  PROPERTY: {
    priority: 1
  },
  PARCEL_AREA: {
    priority: 2
  },
  PARCEL_ID: {
    priority: 2
  },
  ZONING: {
    priority: 2
  },
  STRUCTURE: {
    priority: 2
  },
  LAND_USE: {
    priority: 2
  },
  OWNERSHIP: {
    priority: 2
  },
  CLIMATE: {
    priority: 1
  },
  TEMPERATURE: {
    priority: 2
  },
  CLOUD_COVER: {
    priority: 2
  },
  DAYS: {
    priority: 2
  },
  ACTIVE: {
    priority: 3
  },
  DINNER_OUTSIDE: {
    priority: 3
  },
  FAIR: {
    priority: 3
  },
  INDOOR: {
    priority: 3
  },
  PERFECT: {
    priority: 3
  },
  INTERNET: {
    priority: 1
  },
  INTERNET_SPEED: {
    priority: 2
  },
  INTERNET_DOWNLOAD: {
    priority: 3
  },
  INTERNET_UPLOAD: {
    priority: 3
  },
  INTERNET_LATENCY: {
    priority: 2
  },
  INTERNET_PROVIDER: {
    priority: 2
  },
  INTERNET_COVERAGE: {
    priority: 2
  },
  VIEWSHED: {
    priority: 1
  },
  AGRICULTURE: {
    priority: 1
  },
  PLANT_HARDINESS: {
    priority: 2
  },
  ELEVATION: {
    priority: 1
  },
  DISTANCE_TO_ROAD: {
    priority: 2
  },
  NATURE: {
    priority: 1
  }
}

for (const [key, value] of Object.entries(column_categories)) {
  value.column_group_id = key
}

export default column_categories
