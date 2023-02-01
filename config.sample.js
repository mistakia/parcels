export default {
  import_base_url: '',
  weather_api_url: '',
  cookie: '',
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
