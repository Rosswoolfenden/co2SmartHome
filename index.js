const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const logging = require("./logging/logging");
//const http=require(('http').server(express));
const log = logging.createLogger("server");
const app = express();

// routes 
const cabronRoutes = require('./routes/carbonRoutes');
const authRoutes = require('./routes/authRoutes');
const deviceRoutes = require('./routes/deviceRoutes');
const carbon = require('./carbon/addLatest');
const forescat = require('./carbon/addForecast');
const tplinkplug = require('./devices-controller/tp-link-plug-controller');
const dbpool  = require('./db/mariaDB/mariaPool');

const pool = dbpool.pool; 
const port = config.port;
app.use(bodyParser.json());


//test
// Connect to mongo with retry incase of failure. 
const connectWithRetry = function () {
  log.info('trying to connect to  MongoDB ' + config.mongoURL);  
  return mongoose.connect('mongodb://localhost:27017/carbon', function(err) {
    if (err) {
      log.error('Failed to connect to co2 db, trying again in 10 seconds ' + err);
      setTimeout(connectWithRetry, 10000);
    } else {
      log.info("succesfully connected to mongodb for carbon data");
    }
  });
};

async function sqlConnect() { 
  let conn
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT 1 as val");
    log.info(JSON.stringify(rows));

  } catch (err) {
      log.error(err);
      log.error("Failed to connect to sql databse");
  } finally {
    if (conn){
      log.info("connected to sql databse");
      conn.end();
      return;
    } 
  }
}

sqlConnect();

// connect to maria db.

// uncomment to connect to mongo 
connectWithRetry();
setInterval(function() {
    log.info('calling for real data ');
    carbon.addCarbonData();
}, 1800000/2);

setInterval(function() {
  log.info("Calling for forecasted data")
  forescat.addForecast();
}, 1800000/2);

plugs = tplinkplug.getAllDevices();


// log.info(plug1);
// function turnplug() {
//   log.info("turning plug son now ");
//   tplinkplug.turnAllPlugsOn();
// }

// turnplug();

// carbon.getCarbonData();
app.use('/carbon', cabronRoutes);
app.use('/auth', authRoutes);
app.use('/device', deviceRoutes);
const ipdress = '192.168.1.89';
app.listen(port, ipdress, () => console.log(`Carbon smart home is running on port ${port}!`));