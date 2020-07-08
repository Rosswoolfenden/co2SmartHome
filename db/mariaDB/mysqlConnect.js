const config = require('../../config');
const logger = require("../../logging/logging");
const mariadb = require ('mariadb');
const mariaPool = require('../mariaDB/mariaPool');
const log = logger.createLogger('SQL connector');

const pool = mariaPool;
// FOR LOCAL RUNNING

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


