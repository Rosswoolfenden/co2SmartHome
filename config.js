module.exports = {
    port: 8080,
    mongo: 'mongodb://localhost/co2',
    apiURL: 'https://api.carbonintensity.org.uk/',
    mariadb: {
        client: 'mysql',
        connection: {
          host: '172.17.0.2',
          port: '3306',
          user: 'gui',
          password: 'catervaDb',
          database: 'guidb'
        },
        pool: { min: 0, max: 5 }
      },
}                 