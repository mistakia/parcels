export default {
  port: 8080, // api port
  import_base_url: '',
  weather_api_url: '',
  nature_api_url: '',
  nature_api_key: '',
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
