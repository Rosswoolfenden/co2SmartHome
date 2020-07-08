module.exports = {
    port: 9999,
    mongoURL: 'mongodb://localhost:27017/carbon',
    apiURL: 'https://api.carbonintensity.org.uk/',
    mariadb: {
        client: 'mysql',
        pool: {
          host: config.mariadb.pool,
          user: "smart_home",
          port: "3306",
          password: "qwerty",
          database: "smart_home",
          connectionLimit: 5
        },
    
        pool: { min: 0, max: 5 }
      },
}                 