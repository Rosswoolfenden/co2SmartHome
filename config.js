module.exports = {
    port: 9999,
    mongoURL: 'mongodb://localhost:27017/carbon',
    apiURL: 'https://api.carbonintensity.org.uk/',
    mariadb: {
        client: 'mysql',
        connection: {
          host: 'localhost',
          port: '3306',
          user: 'ross',
          password: 'qwerty',
          database: 'smart_home'
        },
        pool: { min: 0, max: 5 }
      },
}                 