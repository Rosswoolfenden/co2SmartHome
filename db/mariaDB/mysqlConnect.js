const config = require('../../config');
const logger = require("../../logging/logging");
const mariadb = require ('mariadb');
const mariaPool = require('../mariaDB/mariaPool');
const log = logger.createLogger('SQL connector');

// const pool = mariaPool;

// FOR LOCAL RUNNING
const pool = mariadb.createPool({
host: config.mariadb.pool,
user: "smart_home",
port: "3306",
password: "qwerty",
database: "smart_home",
connectionLimit: 5
});

exports.sqlQuery =  async (q, params) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(q, params);
    return result;
  } catch (e) { 
    log.error("ERROR: ", e);
    throw e;
  } finally {
    if (conn) {
      conn.end();
    }
  }
}

exports.testConnection = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT 1 as val");
    log.debug(JSON.stringify(rows));
  } catch (e) {
    log.error('failed to connect to database ',  e);
    return false;
  } finally {
    if(conn) {
      conn.end();
      return true;
    } 
  }
}


