export default {
  port: 8080, // api port
  elevation_api_url: '',
  import_base_url: '',
  import_tile_url: '',
  weather_api_url: '',
  nature_api_url: '',
  nature_api_key: '',
  proxy_urls_api: '',
  weather_data_path: '',
  cookie: '',
  osm_db: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      database: 'osm'
    },
    pool: {
      min: 2,
      max: 10
    }
  },
  parcels_db: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'root',
      // password: 'xxxxx',
      database: 'parcels_development'
    },
    pool: {
      min: 2,
      max: 10
    }
  }
}
