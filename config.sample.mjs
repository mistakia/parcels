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
  postgres: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      database: 'osm'
    }
  },
  mysql: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'root',
      // password: 'xxxxx',
      database: 'parcels_development',
      decimalNumbers: true
    },
    pool: {
      min: 2,
      max: 10
    }
  }
}
