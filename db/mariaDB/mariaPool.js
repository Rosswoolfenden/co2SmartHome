const config = require('../../config');

const logger = require("../../logging/logging");
const mariadb = require ('mariadb')
const log = logger.createLogger('SQL Pool');
exports.pool = mariadb.createPool({
  host: "localhost",
  user: "smart_home",
  port: "3306",
  password: "qwerty",
  database: "smart_home",
  connectionLimit: 5
});

